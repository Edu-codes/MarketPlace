import { getAllProductos } from "../../services/producto";
import { useState, useEffect } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import VisibilityIcon from "@mui/icons-material/Visibility";

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


export default function ProductosCliente() {

    const [productos, setProductos] = useState([])
    const [productoSeleccionado, setProductoSeleccionado] = useState({})



    useEffect(() => {

        const traerProductos = async () => {
            try {
                const data = await getAllProductos()
                setProductos(data)
                console.log("productos: ", data)
            } catch (error) {
                console.error("error al traer productos", error)
            }

        }
        traerProductos()
    }, [])


    return (
        <>


            <Box
                sx={{
                    padding: '3rem',
                    display: 'grid',
                    gridTemplateColumns: { md: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)', xs: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' },
                    gap: '3rem',
                }}
            >
                {productos.map((product) => (
                    <Box
                        key={(product.id)}
                        sx={{
                            backgroundColor: "#fff",
                            maxWidth: "300px",
                            p: "2rem 3rem",
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
                        <Box sx={{ position: "relative" }}>
                            <img
                                src="/public/Arroz.jpg"
                                alt="Arroz"
                                style={{ width: "10rem", height: "10rem", borderRadius: "0.5rem" }}
                            />
                            ${product.precio}
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
                                {product.nombrePro}
                            </Typography>

                            {/* Botón carrito */}
                            <Box
                                sx={{
                                    justifySelf: "start",
                                    border: "2px solid",
                                    borderColor: "primary.main",
                                    padding: "1rem",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "0.4s",
                                    ":hover": {
                                        backgroundColor: "primary.main",
                                        "& svg": { color: "#fff" },
                                    },
                                }}
                            >
                                <ShoppingBasketIcon sx={{ fontSize: "1.5rem", color: "primary.main" }} />
                            </Box>

                            {/* Precio */}
                            <Typography
                                sx={{
                                    justifySelf: "end",
                                    alignSelf: "center",
                                    fontSize: "1.3rem",
                                    fontWeight: 600,
                                }}
                            >

                            </Typography>

                        </Box>

                    </Box>

                ))}
            </Box>
        </>
    )

}