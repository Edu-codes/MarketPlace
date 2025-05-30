// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/acceso/AccesoLogin";
import { MyContext } from "../context/Context";
import { useContext } from 'react';


import { TextField, Button, Box, Typography, Link, styled } from "@mui/material";
import { LinearIndeterminate } from "../components/Utilidades/Progress";


import Swal from "sweetalert2";



const CustomTextField = styled(TextField)(({ theme }) => ({


  '& .MuiInputBase-input': {
    color: '#fff',
  },
  '& label': {
    color: "#fff",
  },
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },

  },
}));



export default function Login() {



  const [doc, setDoc] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const { setUser } = useContext(MyContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    setTimeout(async () => {

      try {
        const { token, user } = await loginUser(doc, password);

        if (!user || !user.roles) {

          Swal.fire({
            icon: 'question',
            title: 'Lo sentimos',
            text: 'Si estas registrado?',
          });

          console.error("El usuario o su rol no están definidos");
          return;
        }

        // Guardar usuario y token en contexto (MyContext se encarga de sessionStorage)
        setUser({ ...user, token }); // Si deseas puedes guardar token dentro del user

        if (user.roles?.includes('Admin')) {
          navigate('/Admin/Inicio');
        } else if (user.roles?.includes('Cliente')) {
          navigate('/Client/Inicio');
        }
        //  else {
        //   navigate('/Unauthorized'); 
        // }


      } catch (err) {
        console.error("Error en login:", err);

        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: err.mensaje || err.message
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
            filter: "brightness(0.8)"
          }}
        />

        {/* Contenedor del login */}
        <Box
          sx={{
            width: 400,
            margin: "10rem auto",
            padding: "2rem",
            backgroundColor: "rgba(43, 39, 39, 0.7)",
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

          <CustomTextField
            fullWidth
            label="Documento"
            type="text"
            name="doc"
            value={doc}
            onChange={(e) => setDoc(e.target.value)}
            margin="normal"
            required
          />

          <CustomTextField
            fullWidth
            label="Contraseña"
            type="password"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            sx={{

              padding: "1rem",
              borderRadius: "0.5rem",
              "&:hover": {
                backgroundColor: "dark.main",
                color: "text.primaryLight",
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

            sx={{ marginTop: "1rem", color: "text.primaryLight" }}
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