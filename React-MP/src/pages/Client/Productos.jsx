import { getAllProductos } from "../../services/producto";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { getAllFotos } from "../../services/foto";

import CardProducto from "../../components/Usuarios/CardProducto";


export default function ProductosCliente() {

    const [productos, setProductos] = useState([])
    const [imagenes, setImagenes] = useState([])
    const [imagenesPorId, setImagenesPorId] = useState([])

    //Traemos las imagenes
    //Traemos las imagenes
    // useEffect(() => {
    //     const obtenerFotosPorId = async () => {
    //         try {
    //             const data = await fotoPorId(productos.referencia)
    //             setImagenesPorId(data)
    //             console.log("Imagnees:" , data)

    //         } catch (error) {
    //             console.log("error al traer imaenes", error)
    //         }
    //     }
    //     obtenerFotosPorId
    // },[])


    //Traemos las imagenes
    useEffect(() => {
        const obtenerFotos = async () => {
            try {
                const data = await getAllFotos()
                setImagenes(data)
                console.log("Imagnees:", data)

            } catch (error) {
                console.log("error al traer imaenes", error)
            }
        }
        obtenerFotos()
    }, [])

    useEffect(() => {
        console.log("imagenes actualizado:", imagenes);
    }, [imagenes]);


    //traemos productos 
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
                    padding: '2rem',
                    display: 'grid',
                    gridTemplateColumns: { md: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)', xs: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' },
                    gap: '1rem',
                }}
            >

                {productos.map((product) => (

                    <CardProducto
                        key={product.referencia}
                        precio={product.precio}
                        nombre={product.nombrePro}
                        product={product}
                        imagenes={imagenes}
                    />
                ))}
            </Box >
        </>
    )

}