import BtnLogOut from "../../components/Button/BtnLogOut"
import { Box } from "@mui/material"
import fotoHeader from "../../assets/varios/fotoHeader.jpg"


export default function Inicio() {
    return (
        <>


            <Box sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '300px',
                        borderRadius: '16px', 
                        overflow: 'hidden',
                    }}
                >
                    {/* Imagen de fondo */}
                    <img
                        src={fotoHeader}
                        alt="Header"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />

                    {/* Capa oscura semitransparente */}
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Negro con transparencia
                        }}
                    />

                    {/* Texto centrado */}
                    <Box sx={{ display: "flex" }}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                                zIndex: 1,
                            }}
                        >
                            <h1>
                                Bienvenido Administrador
                            </h1>

                        </Box>
                    </Box>
                </Box>


            </Box>
        </>
    )
}
