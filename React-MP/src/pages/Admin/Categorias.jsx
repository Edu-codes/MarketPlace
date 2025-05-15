import { actualizarCategorias, getAllCategorias, eliminarCategoria } from "../../services/categoria"
import { useState, useEffect, use } from "react"
import FormUpdateCat from "../../components/Button/FormUpdateCat";
import Swal from 'sweetalert2';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from '@mui/material';


function Categorias() {

    const [categoria, setCategoria] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [mostrarModal, setMostrarModal] = useState(false)

    const [catSeleccionada, setCatSeleccionada] = useState([])
    const [formData, setFormData] = useState({
        id: "",
        nombreCat: ""
    })

    useEffect(() => {
        const traerCategorias = async () => {
            try {
                const data = await getAllCategorias()
                setCategoria(data)
                console.log(data)
            } catch (error) {
                console.log("Error al traer categorias")
                throw (error)
            }
        };

        traerCategorias()
    }, [])

    const handleFilaTabla = (cat) => {

        setFormData({
            id: cat.id,
            nombreCat: cat.nombreCat
        })

        setCatSeleccionada(cat)
        setMostrarModal(true)
    }
    const handleGuardar = async () => {
        try {
            const datosAEnviar = { ...formData };
            console.log(datosAEnviar)
            await actualizarCategorias(catSeleccionada.id, datosAEnviar);
            setMostrarModal(false); // Mover antes


            Swal.fire({
                icon: 'success',
                title: 'Actualizado',
                text: 'Categora Actualizada Correctamente'
            });
            setCategoria((prevCategorias) =>
                prevCategorias.map((cat) =>
                    cat.id === catSeleccionada.id
                        ? { ...cat, nombreCat: formData.nombreCat }
                        : cat
                )
            );
        } catch (error) {
            alert("No pueden haber campos Vacíos :)");
        }
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleEliminar = async () => {

        setMostrarModal(false);

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            backdrop: true, // esto agrega fondo oscuro
        });

        if (result.isConfirmed) {
            try {
                await eliminarCategoria(catSeleccionada.id);

                setCategoria((prevCategorias) =>
                    prevCategorias.filter((cat) => cat.id !== catSeleccionada.id)
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'La categoría fue eliminada correctamente.'
                });
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setMostrarModal(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'No se puede eliminar',
                        text: error.response.data
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error inesperado',
                        text: 'Ocurrió un error al eliminar la categoría.'
                    });
                }

                console.error("Error al eliminar categoría:", error);
            }
        }
    };




    const handleCerrarModal = () => {
        setMostrarModal(false)
    }

    return (

        <>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Productos</h1>
            <input
                type="text"
                placeholder="Buscar por nombre o ID"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{
                    padding: "8px",
                    marginBottom: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "100%",
                    maxWidth: "300px",
                }}
            />
            <TableContainer component={Paper} elevation={2}>
                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Categoria</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {categoria.filter((cat) =>
                                cat.nombreCat.toLowerCase().includes(busqueda.toLowerCase()) ||
                                (cat.id?.toString().includes(busqueda) && !isNaN(busqueda))
                            ).map((cat) => (
                                <TableRow
                                    key={cat.id}
                                    hover
                                    onClick={() => handleFilaTabla(cat)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell align="center">{cat.id}</TableCell>
                                    <TableCell align="center">{cat.nombreCat}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </TableContainer>

            {mostrarModal && catSeleccionada && (

                <FormUpdateCat
                    categoria={formData}
                    formData={formData}
                    handleCerrarModal={handleCerrarModal}
                    handleChange={handleChange}
                    handleGuardar={handleGuardar}
                    handleEliminar={handleEliminar}
                />

            )}


        </>
    )
}
export default Categorias