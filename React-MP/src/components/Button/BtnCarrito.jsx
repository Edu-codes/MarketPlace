import { useEffect, useState } from "react"

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

//para la cantidad del carrito
import Badge from '@mui/material/Badge';

//importamos modal
import ModalUsuario from "../Modal";
import Button from '@mui/material/Button';

//navegar
import { useNavigate } from "react-router";

export default function BtnCarrito() {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleAbrirModal = () => {
        handleCarrito()
        setOpenModal(true)
    }


    const [cantidadBadge, setCantidadBadge] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [productosCarrito, setProductosCarrito] = useState([])



    useEffect(() => {

        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user || !user.doc) return;

        const key = (`cart_${user.doc}`)

        const actualizarCantidadBadge = () => {
            let carrito = JSON.parse(localStorage.getItem(key) || '[]')
            setCantidadBadge(carrito.length)
        }

        actualizarCantidadBadge()

        window.addEventListener("carritoActualizado", actualizarCantidadBadge)

        return () => {
            window.removeEventListener("carritoActualizado", actualizarCantidadBadge)
        }
    }, [])


    const handleCarrito = () => {

        const user = JSON.parse(sessionStorage.getItem('user'))
        const key = `cart_${user.doc}`

        const carrito = JSON.parse(localStorage.getItem(key) || '[]')

        setProductosCarrito(carrito)

        console.log("prdocutos carrito", productosCarrito)
    }

    const handleEliminarDelCarrito = (id) => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        const key = `cart_${user.doc}`
        const nuevoCarrito = productosCarrito.filter((producto) => producto.referencia !== id)
        localStorage.setItem(key, JSON.stringify(nuevoCarrito))
        setProductosCarrito(nuevoCarrito)
    }

    //Operaciones del modal
    const total = productosCarrito.reduce(
        (acc, producto) => acc + producto.precio * producto.cantidad,
        0
    );

    const totalFormateado = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(total);

    return (
        <>
            <Badge badgeContent={cantidadBadge} color="primary">

                <ShoppingCartIcon
                    onClick={() => { handleAbrirModal() }}

                />
                <ModalUsuario
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    title="Tus Productos"

                >
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            "& > :not(style)": {
                                m: 1,
                                width: "100%",
                                height: "100%",
                            },
                            maxHeight: "400px",
                            overflowY: "auto",
                        }}
                    >

                        {productosCarrito.length === 0 ? (
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: 2,
                                    textAlign: "center",
                                    color: "gray",
                                }}
                            >
                                🛒 Tu carrito está vacío
                            </Paper>
                        ) : (
                            productosCarrito.map((producto) => {
                                const precioPorCantidad = producto.precio * producto.cantidad;
                                return (
                                    <Paper
                                        key={producto.referencia}
                                        elevation={3}
                                        sx={{
                                            padding: 1,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                        <span>
                                            {producto.nombrePro} - ${precioPorCantidad} x {producto.cantidad}
                                        </span>
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => handleEliminarDelCarrito(producto.referencia)}
                                        >
                                            X
                                        </Button>
                                    </Paper>
                                );
                            }

                            )
                        )
                        }
                    </Box>

                    <Box
                        sx={{
                            width: "100%",
                            backgroundColor: "white",
                            marginTop: "1rem",
                            marginBottom: "2rem"
                        }}>

                        TOTAL: {totalFormateado}

                    </Box>


                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            backgroundColor: "white",
                        }}
                    >
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => {
                                handleNavigation('PortalPagos');
                                setOpenModal(false)
                            }}
                        >
                            Confirmar compra
                        </Button>
                    </Box>
                </ModalUsuario>

            </Badge>
        </>

    )


}