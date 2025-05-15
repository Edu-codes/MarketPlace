// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/acceso/AccesoLogin";
import { MyContext } from "../context/Context";
import { useContext } from 'react';

import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { LinearIndeterminate } from "../components/Utilidades/Progress";


import Swal from "sweetalert2";


export default function Login() {
  const [doc, setDoc] = useState('');
  const [password, setpassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const { setUser } = useContext(MyContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    setTimeout(async () => {

      try {
        const { token, user } = await loginUser(doc, password);

        if (!user || !user.rolId) {
          console.error("El usuario o su rol no están definidos");
          return;
        }

        // Guardar usuario y token en contexto (MyContext se encarga de sessionStorage)
        setUser({ ...user, token }); // Si deseas puedes guardar token dentro del user

        // Redirigir según el rol
        if (user.rolId === 'Admin') {
          navigate('/Admin/Inicio');
        } else {
          navigate('/Client/Inicio');
        }

      } catch (err) {
        console.error("Error en login:", err);

        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: err.mensaje
        });
      } finally {
        setIsLoading(false)
      }
    }, 2000);
  };

  return (
    <>

      <Box
        sx={{
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
          src="/Acceso/imgLogin.png"
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

        {/* Contenedor del login */}
        <Box
          sx={{
            width: 400,
            margin: "10rem auto",
            padding: "2rem",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
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
            Login

          </Typography>

          <TextField
            fullWidth
            label="Documento"
            type="text"
            name="doc"
            value={doc}
            onChange={(e) => setDoc(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            name="pass"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            margin="normal"
            required
          />

          {

            isLoading &&


            <LinearIndeterminate />
          }


          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              padding: "1rem",
              borderRadius: "0.5rem",
              "&:hover": {
                backgroundColor: "dark.main",
              },
              marginTop: "1rem",
            }}
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ marginTop: "1rem", color: "text.secondary" }}
          >
            ¿No tienes cuenta?{" "}
            <Link href="/Registro" underline="hover" sx={{ fontWeight: 500 }}>
              Regístrate aquí
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );

};