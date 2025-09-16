import { useEffect, useState } from "react"
import { getAllSubCategorias, actualizarSubCategoria } from "../../services/subCategoria"
import { getAllCategorias } from "../../services/categoria";
import FormUpdateSubCat from "../../components/Formularios/FormUpdateSubCat";
import { crearFoto, getAllFotos, fotoPorId } from "../../services/foto";

import Swal from "sweetalert2";


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
    //guarda las categorias
    const [categoria, setCategoria] = useState([])
    //guarda las subcategorias
    const [subCategoria, setSubCategorias] = useState([])
    //guarda las fotos por id SubCat
    const [fotoSubCat, setFotoSubCat] = useState([])
    //guarda todas las fotos
    const [foto, setFoto] = useState([])

    const [formDataFoto, setFormDataFoto] = useState({
        ruta: "",
        imageableId: "",
        imageableType: ""
    });

    const [formData, setFormData] = useState({
        id: "",
        nombreSubCat: "",
        nameCategoria: "",
        categoriaId: "",
    });

    //traemos Categorias
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

    //Trameos Subcategorias
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

    //traemos todas las fotos
    useEffect(() => {
        const listaDeFotos = async () => {
            try {
                const data = await getAllFotos()
                setFoto(data)
            } catch (error) {
                console.log("Error al cargar las fotos", error);
            }
            listaDeFotos()
        }
    }, [])

    //seleccionamis fila de la tabla
    const handleFilaTabla = (subCat) => {

        console.log("->", subCat)
        setFormData({
            id: subCat.id,
            nombreSubCat: subCat.nombreSubCat,
            categoriaId: subCat.categoriaId,
            nameCategoria: subCat.nameCategoria
        });
        setSubCatSeleccionada(subCat)

        setMostrarModal(true)
    };

    //Actualizar datos SubCat
    const handleGuardar = async () => {
        try {
            const datosAEnviar = { ...formData };

            console.log("Enviando a API:", datosAEnviar);
            // No eliminar idCat aunx|que no cambie
            await actualizarSubCategoria(subCatSeleccionada.id, datosAEnviar);
            setMostrarModal(false);
            const data = await getAllSubCategorias();
            setSubCategorias(data);
        } catch (error) {
            alert("no pueden haber campos vacios :)")
            console.error("Error al actualizar SubCat", error);
        }
    };

    useEffect(() => {
        if (formData?.id) {
            handleFotosPorId(); // solo si hay id
        }
    }, [formData.id]);

    //cargar las fotos por id
    const handleFotosPorId = async () => {
        try {
            const response = await fotoPorId(formData.id);

            setFotoSubCat(response); // <- Forzamos cambio de estado
        } catch (error) {
            console.error("Error recargando fotos", error);
        }
    };


    //Agregar imagen nueva a subcat
    const handleNuevaImagen = async (event) => {

        const file = event.target.files[0];
        console.log("file", file)

        if (file) {
            try {

                const formDataToSend = new FormData();

                formDataToSend.append("file", file);
                formDataToSend.append("imageableId", formData.id);
                formDataToSend.append("imageableType", formData.nameCategoria);

                await crearFoto(formDataToSend)
                handleFotosPorId()

            } catch (error) {
                alert("no pueden haber campos vacios :)")
                console.error("Error al actualizar foto", error);
            }
        }
    }

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
                                <TableCell>Nombre Categoria</TableCell>
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
                                        <TableCell>{subCat.nameCategoria}</TableCell>
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
                        fotoSubCat={fotoSubCat}
                        cargarFotos={handleFotosPorId}
                        rutaFoto={formDataFoto.ruta}
                        handleCerrarModal={handleCerrarModal}
                        handleChange={handleChange}
                        handleGuardar={handleGuardar}
                        handleNuevaImagen={handleNuevaImagen}
                    />
                )}
            </div>




        </>

    );
};

export default SubCategorias;