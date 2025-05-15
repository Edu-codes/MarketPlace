import { getAllCategorias } from "../../services/categoria"
import { useEffect, useState } from "react"
import { Box, Typography } from '@mui/material';

export default function CategoriasCliente() {

    const [categorias, setCategorias] = useState([])


    useEffect(() => {

        const traerCategorias = async () => {

            try {
                const data = await getAllCategorias()
                setCategorias(data)
                console.log("categorias: ", data)
            } catch (error) {
                console.error("error cat:", error)
            }
        }

        traerCategorias()
    }, [])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', mb: '3rem' }}>

            <Box
                sx={{
                    padding: '3rem',
                    display: 'grid',
                    gridTemplateColumns: {md:'repeat(3, 1fr)',sm:'repeat(2, 1fr)', xs:'repeat(1, 1fr)'},
                    gap: '3rem',
                }}
            >
                {/* Categoría 1 */}

                {categorias.map((cat) => (


                    <Box
                    key={(cat.id)}
                        sx={{
                        
                            height: '20rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '2rem',
                            gap: '2rem',
                            backgroundImage: `linear-gradient(#00000080, #00000080), url(/public/desayuno.jpg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '2.5rem',
                                color: '#fff',
                                textTransform: 'capitalize',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    width: '2.5rem',
                                    height: '2px',
                                    backgroundColor: '#fff',
                                    position: 'absolute',
                                    bottom: '-1rem',
                                    left: '50%',
                                    transform: 'translate(-50%, 50%)',
                                },
                            }}
                        >
                            {cat.nombreCat}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '1.6rem',
                                color: '#fff',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            Ver más
                        </Typography>
                    </Box>

                ))}

            </Box>
        </Box>
    );
}