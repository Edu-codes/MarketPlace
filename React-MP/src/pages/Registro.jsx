import React from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

import Swal from "sweetalert2";

import { registroUser } from "../services/acceso/RegistroUser";

const RegistroForm = () => {

    const [formData, setFormData] = useState({
        doc: "",
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        pass: "",
        pass2: ""
    });
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.pass2 === formData.pass) {

            try {
                await registroUser(formData);
                console.log("Datos enviados:", formData);

                Swal.fire({
                    icon: 'success',
                    title: 'Felicidades!',
                    text: 'Te haz registrado correctamente.'
                });
                handleNavigation('/')
            } catch (error) {
                console.error("Error al registrar usuario:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lo sentimos',
                    text: error.response.data.mensaje
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Las contraseñas no coinciden.'
            });
        };
    }

    // Función para manejar el cambio de los valores en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (

        <>

            <Box sx={{
                position: "relative",
                minHeight: "100vh",
                backgroundColor: "#f0f2f5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden", // Evita que el contenido se desborde
            }}>

                {/* Imagen de fondo en la parte inferior */}
                <Box
                    component="img"
                    src="./public/Acceso/imgRegistro.png"
                    alt="fondo"
                    sx={{
                        position: "absolute",
                        left: 0,
                        width: "100%",
                        zIndex: 0,
                        objectFit: "cover",
                        pointerEvents: "none",
                    }}
                />




                <Box
                    sx={{
                        width: 400,
                        margin: "10rem auto",
                        padding: "2rem",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        borderRadius: "1rem",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ marginBottom: "1rem", color: "primary.main" }}
                    >
                        Crear Cuenta
                    </Typography>

                    <TextField
                        fullWidth
                        label="Documento"
                        name="doc"
                        value={formData.doc}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Contraseña"
                        type="password"
                        name="pass"
                        value={formData.pass}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Confirma Contraseña"
                        type="password"
                        name="pass2"
                        value={formData.pass2}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            "&:hover": {
                                backgroundColor: "dark.main",
                            },
                        }}
                        type="submit"
                    >
                        Registrarse
                    </Button>

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ marginTop: "1rem", color: "text.secondary" }}
                    >
                        Ya tienes cuenta?{" "}
                        <Link href="/" underline="hover" sx={{ fontWeight: 500 }}>
                            Inicia Sesion
                        </Link>
                    </Typography>

                </Box>
            </Box>
        </>
    );
};

export default RegistroForm;
