import React, { useEffect, useState } from "react";

//Servicios
import { getAllProductos, actualizarProducto, eliminarProducto } from "../../services/producto";
import { getAllCategorias } from "../../services/categoria";
import { getAllSubCategorias } from "../../services/subCategoria";
import { getAllUnidadMedida } from "../../services/unidadMedida";
import { getAllEstado } from "../../services/estado";


import FormularioProductoModal from "../../components/Formularios/FormUpdateProduct";

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

const ProductosAdmin = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [subCategorias, setSubCategorias] = useState([]);
    const [unidadMedida, setUnidadMedida] = useState([]);
    const [estado, setEstado] = useState([]);
    const [busqueda, setBusqueda] = useState("");


    const [formData, setFormData] = useState({
        NombrePro: "",
        Precio: "",
        Stock: "",
        // idCat: "",
        SubCategoriaId: "",
        UniMedId: "",
        EstadoId: "",
        Descripcion: ""
    });

    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        const obtenerEstados = async () => {
            try {
                const data = await getAllEstado()
                setEstado(data)
                console.log("estados:", data)
            } catch (error) {
                console.log("Error al traer los estados", error)
            }
        }
        obtenerEstados();
    }, [])

    useEffect(() => {
        const obtenerUnidadMedida = async () => {
            try {
                const data = await getAllUnidadMedida()
                setUnidadMedida(data)
                console.log("unidad me", data)
            } catch (error) {
                console.log("Error al cargar unidades de medida", error)
            }
        }
        obtenerUnidadMedida();
    }, [])

    useEffect(() => {
        const obtenerSubCategorias = async () => {
            try {
                const data = await getAllSubCategorias();
                setSubCategorias(data)
            } catch {
                console.log("error al cargar subCategorias", error)
            }
        }
        obtenerSubCategorias();
    }, [])

    // Cargar las categorías
    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const data = await getAllCategorias();
                setCategorias(data);
            } catch (error) {
                console.error("Error cargando categorias:", error);
            }
        };

        obtenerCategorias();
    }, []);

    // Cargar productos
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const data = await getAllProductos();
                setProductos(data);
                console.log("pro", data)
            } catch (error) {
                console.error("Error cargando productos:", error);
            }
        };

        obtenerProductos();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Manejar guardar el producto
    const handleGuardar = async () => {

        try {
            const datosAEnviar = { ...formData };

            console.log("Enviando a API:", formData);
            // No eliminar idCat aunque no cambie
            await actualizarProducto(productoSeleccionado.referencia, datosAEnviar);
            setMostrarModal(false);
            const data = await getAllProductos();

            Swal.fire({
                icon: 'success',
                title: 'Actualizado',
                text: 'Producto Actualizado Correctamente'
            });

            setProductos(data);

        } catch (error) {
            alert("no pueden haber campos vacios :)")
            console.error("Error al guardar el producto", error);
        }
    };

    // Manejar el clic en una fila para seleccionar un producto
    const handleFilaClick = (producto) => {
        console.log("datos en click fila:", producto)
        setFormData({
            Referencia: producto.referencia,
            NombrePro: producto.nombrePro,
            Precio: parseFloat(producto.precio), // Usa parseFloat si es decimal
            Stock: parseInt(producto.stock),
            SubCategoriaId: producto.subCategoriaId ? parseInt(producto.subCategoriaId) : null,
            UniMedId: producto.uniMedId ? parseInt(producto.uniMedId) : null,
            EstadoId: producto.estadoId ? parseInt(producto.estadoId) : null,
            Descripcion: producto.descripcion,
        });
        setProductoSeleccionado(producto);

        setMostrarModal(true); // Abrir el modal cuando se selecciona la fila
    };

    const handleEliminar = async () => {

        setMostrarModal(false)

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
        })

        if (result.isConfirmed) {
            try {
                await eliminarProducto(productoSeleccionado.id)
                setProductos((prevProductos) =>
                    prevProductos.filter((producto) => producto.id !== productoSeleccionado.id)
                )

                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'Producto eliminado correctamente.'
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
                        text: 'Ocurrió un error al eliminar producto.'
                    });
                }

                console.error("Error al eliminar producto:", error);
            }
        }

    }

    // Cerrar el modal sin guardar cambios
    const handleCerrarModal = () => {
        setMostrarModal(false);
    };

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

            <div style={{ padding: 10 }}>

                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell><b>Referencia</b></TableCell>
                                <TableCell><b>Nombre</b></TableCell>
                                <TableCell><b>Precio</b></TableCell>
                                <TableCell><b>Cantidad</b></TableCell>
                                <TableCell><b>Categoría</b></TableCell>
                                <TableCell><b>SubCat</b></TableCell>
                                <TableCell><b>Unidad Medida</b></TableCell>
                                <TableCell><b>Estado</b></TableCell>
                                <TableCell><b>Detalle</b></TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productos.filter((producto) =>
                                producto.nombrePro.toLowerCase().includes(busqueda.toLowerCase()) ||
                                producto.Referencia?.toString().includes(busqueda) && !isNaN(busqueda) || (producto.unidadMedida?.toLowerCase() || "").includes(busqueda.toLowerCase())

                            )
                                .map((producto) => (
                                    <TableRow
                                        key={producto.referencia}
                                        hover
                                        onClick={() => handleFilaClick(producto)}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell>{producto.referencia}</TableCell>
                                        <TableCell>{producto.nombrePro}</TableCell>
                                        <TableCell>{producto.precio}</TableCell>
                                        <TableCell>{producto.stock}</TableCell>
                                        <TableCell>{producto.nameCategoria}</TableCell>
                                        <TableCell>{producto.nameSubCategoria}</TableCell>
                                        <TableCell>{producto.nameUniMed}</TableCell>
                                        <TableCell>{producto.nameEstado}</TableCell>
                                        <TableCell>{producto.descripcion}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {mostrarModal && productoSeleccionado && (
                    <FormularioProductoModal
                        producto={productoSeleccionado}
                        formData={formData}
                        categorias={categorias}
                        subCategorias={subCategorias}
                        unidadMedida={unidadMedida}
                        estado={estado}
                        handleChange={handleChange}
                        handleGuardar={handleGuardar}
                        handleCerrarModal={handleCerrarModal}
                        handleEliminar={handleEliminar}
                    />
                )}
            </div>

        </>
    );
};

export default ProductosAdmin;
