import { Box, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import VisibilityIcon from "@mui/icons-material/Visibility";

//alertas
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";

import { CountCantidad } from "../../components/CountCantidad";
import BtnAgregarAlCarrito from "../../components/Button/BtnAgregarAlCarrito";



const iconButtonStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "2px solid",
    borderColor: "primary.main",
    backgroundColor: "#fff",
    "&:hover": {
        backgroundColor: "primary.main",
        "& svg": { color: "#fff" },
    },
    "&:focus": {
        outline: "none",
    },
};

export default function CardProducto({ precio, nombre, product, imagenes }) {
    const [cantidad, setCantidad] = useState(0)

    //Renderizamos la cantidad en el LocalStorage
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user || !user.doc) return;

        const key = `cart_${user.doc}`;
        const carrito = JSON.parse(localStorage.getItem(key)) || [];

        const productoEnCarrito = carrito.find(item => item.referencia === product.referencia);

        if (productoEnCarrito) {
            setCantidad(productoEnCarrito.cantidad);
        } else {
            setCantidad(0);
        }

    }, [product.id]);


    //Agrega productos al carrito
    const handleAgregarAlCarrito = () => {
        let cantidadFinal = cantidad === -1 ? 1 : cantidad;

        setCantidad(cantidadFinal);

        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user || !user.doc) {
            console.error("Usuario no válido o no autenticado");
            return;
        }

        const key = `cart_${user.doc}`;
        const carritoActual = JSON.parse(localStorage.getItem(key)) || [];

        console.log("Producto que intento agregar:", product);
        console.log("ID del producto:", product.referencia);
        console.log("Carrito actual:", carritoActual);

        const indexExistente = carritoActual.findIndex(item => item.referencia === product.referencia);

        let nuevoCarrito;
        if (indexExistente !== -1) {
            if (cantidadFinal === 0) {
                const confirmar = window.confirm(
                    `La cantidad es 0. ¿Quieres eliminar "${product.nombrePro}" del carrito?`
                );

                if (confirmar) {
                    // Eliminamos el producto
                    carritoActual.splice(indexExistente, 1);
                    nuevoCarrito = [...carritoActual];
                } else {
                    // Si no confirma, dejamos el carrito como estaba
                    nuevoCarrito = [...carritoActual];
                }
            } else {
                // Ya existe -> actualizamos cantidad
                carritoActual[indexExistente].cantidad = cantidadFinal;
                nuevoCarrito = [...carritoActual];
                toast.success(`Cantidad de "${product.nombrePro}" actualizada correctamente`, {
                    position: "bottom-left",
                    autoClose: 3000,
                });
            }

        } else {
            if (cantidadFinal > 0) {
                // No existe -> agregamos producto
                const items = {
                    ...product,
                    cantidad: cantidadFinal,
                };
                nuevoCarrito = [...carritoActual, items];
                toast.success(`Producto "${product.nombrePro}" agregado correctamente`, {
                    position: "bottom-left",
                });

            } else {
                // Si intentan agregar con 0 y no existe, no hacemos nada
                nuevoCarrito = [...carritoActual];
            }
        }


        // Evitamos agregar productos con cantidad inválida

        localStorage.setItem(key, JSON.stringify(nuevoCarrito));
        console.log("Carrito actualizado:", nuevoCarrito);

        // 🔔 Dispara un evento personalizado
        window.dispatchEvent(new Event('carritoActualizado'));
    };



    const imagenPrincipal = imagenes.find(
        (img) => img.imageableId === product.referencia && img.estadoId === 3
    );

    return (
        <>
            <Box
                sx={{
                    backgroundColor: "#fff",
                    maxWidth: "100%",
                    p: "1rem 1rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                    transition: "0.3s",
                    ":hover .button-group": {
                        right: "-1rem",
                        zIndex: 0,
                    },
                }}
            >


                {/* Imagen */}
                <Box sx={{ position: "relative", width: "100%", height: "10rem", transition: "transform 0.3s ease", }}>

                    <img
                        src={imagenPrincipal ? `https://localhost:44369/${imagenPrincipal.ruta}` : "/placeholder.jpg"}
                        alt={product.nombrePro}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "0.5rem",
                            objectFit: "cover",
                        }}
                    />

                    {/* Precio */}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textAlign: "center",
                            padding: "0.3rem",
                            borderBottomLeftRadius: "0.5rem",
                            borderBottomRightRadius: "0.5rem",
                        }}
                    >
                        ${precio}
                    </Box>


                    {/* Botones flotantes */}
                    <Box
                        className="button-group"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            position: "absolute",
                            top: 0,
                            right: "-3rem",
                            zIndex: -1,
                            transition: "all 0.4s ease",
                        }}
                    >
                        <IconButton
                            sx={iconButtonStyle}
                        >
                            <VisibilityIcon sx={{ color: "primary.main", fontSize: "1.5rem" }} />
                        </IconButton>
                        <IconButton
                            sx={iconButtonStyle}
                        >
                            <FavoriteBorderIcon sx={{ color: "primary.main", fontSize: "1.5rem" }} />
                        </IconButton>
                        <IconButton
                            sx={iconButtonStyle}
                        >
                            <CompareArrowsIcon sx={{ color: "primary.main", fontSize: "1.5rem" }} />
                        </IconButton>
                    </Box>
                </Box>

                {/* Contenido */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        justifyItems: "center",
                        rowGap: "1rem",
                        mt: 2,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            gridColumn: "1 / -1",
                            fontSize: "1.6rem",
                            fontWeight: 400,
                            cursor: "pointer",
                            ":hover": { color: "primary.main" },
                        }}
                    >
                        {nombre}
                    </Typography>

                    {/* Contamos la cantidad que desamos agregar de un producto */}
                    <Box>
                        <CountCantidad
                            cantidad={cantidad}
                            setCantidad={setCantidad}
                        />
                    </Box>

                    {/* agregamos el boton de agregar el carrito */}

                    <BtnAgregarAlCarrito
                        onClick={handleAgregarAlCarrito}
                    />
                </Box>
                <ToastContainer />
            </Box>


        </>
    )
}