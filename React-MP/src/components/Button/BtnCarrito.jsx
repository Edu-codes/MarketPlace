import { useEffect, useState } from "react"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import ModalUsuario from "../Modal";
import { Button } from "@mui/material";

export default function BtnCarrito() {

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

    const handleAbrirModal = () => {
        handleCarrito()
        setOpenModal(true)
    }

    const handleCarrito = () => {

        const user = JSON.parse(sessionStorage.getItem('user'))
        const key = `cart_${user.doc}`

        const carrito = JSON.parse(localStorage.getItem(key) || '[]')

        setProductosCarrito(carrito)

        console.log(productosCarrito)
    }

    const handleEliminarDelCarrito = (id) => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        const key = `cart_${user.doc}`
        const nuevoCarrito = productosCarrito.filter((producto) => producto.id !== id   )
        localStorage.setItem(key, JSON.stringify(nuevoCarrito))
        setProductosCarrito(nuevoCarrito)
    }



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
                    <ul>
                        {productosCarrito.map((producto) => (

                            
                            <li key={producto.id}>
                                
                                {producto.nombrePro} - ${producto.precio * producto.cantidad} x {producto.cantidad}
                                <Button
                                onClick={ () => handleEliminarDelCarrito(producto.id)}
                                >
                                    X
                                </Button>
                            </li>

                        ))}
                    </ul>
                </ModalUsuario>
            </Badge>
        </>

    )


}