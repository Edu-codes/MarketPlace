import { useState } from "react"
import ModalUsuario from "../../Modal"
import { Box, Button, Typography } from "@mui/material"
import { eliminarFoto } from "../../../services/foto"


export default function BtnFotos({ fotosPorId, recargarFotos }) {

    const [openModal, setOpenModal] = useState(false)
    const [fotoSeleccionada, setFotoSeleccionada] = useState(null)

    //guarda la foto seleccionada en el state
    const handleClick = (fotos) => {
        setFotoSeleccionada(fotos)
        console.log("id seleccionada:", fotoSeleccionada)
    }

    const handleEliminar = async () => {
        try {
            await eliminarFoto(fotoSeleccionada.id || fotoSeleccionada.Referencia   );
            console.log("Foto eliminada");

            await recargarFotos(); // Actualiza fotoSubCat en el padre
        } catch (error) {
            console.error("Error al eliminar la foto", error);
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                component="label"
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ mr: 1 }}
            >

                Ver Fotos

            </Button>
            <ModalUsuario
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                title="Fotos"
                sx={{ minWidth: "100%" }}
            >


                {fotosPorId.length === 0 ? (
                    <Typography variant="body1" color="textSecondary">
                        No hay imágenes registradas.
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap", // o quítalo si quieres scroll horizontal
                            gap: 2,
                            minWidth: "100%",
                            justifyContent: "center",
                        }}
                    >


                        {fotosPorId.map((fotos) => (

                            <Box
                                key={fotos.id}
                                onClick={() => { handleClick(fotos) }}
                                sx={{
                                    backgroundColor: "#fff",
                                    width: 150,
                                    height: 150,
                                    p: 1,
                                    borderRadius: 2,
                                    border: fotoSeleccionada?.id === fotos.id
                                        ? '3px solid'
                                        : '1px solid primary',
                                    borderColor: fotoSeleccionada?.id === fotos.id
                                        ? 'primary.main'
                                        : '#ccc',
                                    cursor: "pointer",
                                    boxShadow: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    src={`https://localhost:44369${fotos.ruta}`}
                                    alt="imagen"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 8,
                                    }}
                                />


                            </Box>
                        ))}
                    </Box>
                )}
                <Box sx={{ p: 2 }}>

                    <Button variant="outlined">Asignar</Button>
                    <Button
                        variant="outlined"
                        onClick={() => handleEliminar()}>

                        Eliminar
                    </Button>
                    <Button variant="outlined">Guardar</Button>


                </Box>



            </ModalUsuario>

        </>
    )

}