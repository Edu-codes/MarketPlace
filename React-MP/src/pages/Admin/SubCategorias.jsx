import { useEffect, useState } from "react"
import { getAllSubCategorias, actualizarSubCategoria } from "../../services/subCategoria"
import { getAllCategorias } from "../../services/categoria";
import FormUpdateSubCat from "../../components/Formularios/FormUpdateSubCat";


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


const SubCategorias = () => {

    const [busqueda, setBusqueda] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false)
    const [subCatSeleccionada, setSubCatSeleccionada] = useState(null)
    const [categoria, setCategoria] = useState([])

    const [subCategoria, setSubCategorias] = useState([])
    const [formData, setFormData] = useState({
        id: "",
        nombreSubCat: "",
        nombreCat: "",
        idCat: "",
    });


    //traemos Cattegoris
    useEffect(() => {
        const listaCategorias = async () => {
            try {
                const response = await getAllCategorias()
                console.log("categorias: ", response)
                setCategoria(response)

            } catch (error) {
                console.log("Error al traer categorias ", error)
            }

        }

        listaCategorias()
    }, []);


    //Trameos Subcategoris
    useEffect(() => {

        const ListaSubCategorias = async () => {
            try {
                const data = await getAllSubCategorias()
                console.log("subCategorias: ", data)
                setSubCategorias(data)
            } catch (error) {
                console.log("Error al cargar subCategorias", error);
            }
        }

        ListaSubCategorias();

    }, []);

    //seleccionamis fila de la tabla
    const handleFilaTabla = (subCat) => {

        console.log("->", subCat)
        setFormData({
            id: subCat.id,
            nombreSubCat: subCat.nombreSubCat,
            idCat: subCat.idCat,
            nombreCat: subCat.nombreCat
        });
        setSubCatSeleccionada(subCat)

        setMostrarModal(true)
    };

    //Actualizar SubCat

    // Manejar guardar el producto
    const handleGuardar = async () => {
        try {
            const datosAEnviar = { ...formData };

            console.log("Enviando a API:", formData);
            // No eliminar idCat aunque no cambie
            await actualizarSubCategoria(subCatSeleccionada.id, datosAEnviar);
            setMostrarModal(false);
            const data = await getAllSubCategorias();
            setSubCategorias(data);
        } catch (error) {
            alert("no pueden haber campos vacios :)")
            console.error("Error al actualizar SubCat", error);
        }
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCerrarModal = () => {
        setMostrarModal(false)
    }


    return (

        <>


            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>SubCategorias</h1>
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

            <div style={{ padding: 10 }}>


                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Sub Categoria</TableCell>
                                <TableCell>Categoria</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {subCategoria.filter((subCat) =>
                                subCat.nombreSubCat.toLowerCase().includes(busqueda.toLowerCase()) ||
                                subCat.id?.toString().includes(busqueda) && !isNaN(busqueda) ||
                                subCat.nombreCat.toLowerCase().includes(busqueda.toLowerCase())
                            )

                                .map((subCat) => (
                                    <TableRow
                                        key={subCat.id}
                                        hover
                                        onClick={() => handleFilaTabla(subCat)}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell>{subCat.id}</TableCell>
                                        <TableCell>{subCat.nombreSubCat}</TableCell>
                                        <TableCell>{subCat.nombreCat}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {mostrarModal && subCatSeleccionada && (

                    <FormUpdateSubCat
                        subCategoria={formData}
                        categoria={categoria}
                        formData={formData}
                        handleCerrarModal={handleCerrarModal}
                        handleChange={handleChange}
                        handleGuardar={handleGuardar}
                    />

                )}
            </div>




        </>

    );
};

export default SubCategorias;