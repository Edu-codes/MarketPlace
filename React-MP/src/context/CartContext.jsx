
// CartContext.js
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [cantidadBadge, setCantidadBadge] = useState(0);

    // Actualizar badge cuando cambia el carrito en localStorage
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user || !user.doc) return;

        const key = `cart_${user.doc}`;

        const actualizarCantidadBadge = () => {
            let carrito = JSON.parse(localStorage.getItem(key) || "[]");
            setCantidadBadge(carrito.length);
        };

        actualizarCantidadBadge();

        window.addEventListener("carritoActualizado", actualizarCantidadBadge);
        return () => {
            window.removeEventListener("carritoActualizado", actualizarCantidadBadge);
        };
    }, []);
        // Eliminar producto
    const handleEliminarDelCarrito = (id) => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user || !user.doc) return;

        const key = `cart_${user.doc}`;
        const nuevoCarrito = productosCarrito.filter(
            (producto) => producto.referencia !== id
        );
        localStorage.setItem(key, JSON.stringify(nuevoCarrito));
        setProductosCarrito(nuevoCarrito);

        // Dispara el evento global
        window.dispatchEvent(new Event("carritoActualizado"))
    };


    // Cargar productos del carrito
    const handleCarrito = () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user || !user.doc) return;

        const key = `cart_${user.doc}`;
        const carrito = JSON.parse(localStorage.getItem(key) || "[]");
        setProductosCarrito(carrito);
    };


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
        <CartContext.Provider
            value={{
                productosCarrito,
                setProductosCarrito,
                cantidadBadge,
                setCantidadBadge,
                total,
                totalFormateado,

                //funciones
                handleCarrito,
                handleEliminarDelCarrito,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}

