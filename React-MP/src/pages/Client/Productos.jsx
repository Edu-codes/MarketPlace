import { getAllProductos } from "../../services/producto";
import { useState, useEffect } from "react";
import { Box} from "@mui/material";

import CardProducto from "../../components/Usuarios/CardProducto";


export default function ProductosCliente() {

    const [productos, setProductos] = useState([])



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
                    <CardProducto
                        key={product.id}
                        precio={product.precio}
                        nombre = {product.nombrePro}
                        product = {product}
                    />
                ))}
            </Box >
        </>
    )

}