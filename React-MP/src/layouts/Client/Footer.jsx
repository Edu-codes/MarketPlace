import React from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
  InputBase,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  YouTube,
  Pinterest,
  Instagram,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "primary.main", color: "#fff", mt: 10, px: 5, py: 6 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr) 30rem" },
          gap: 4,
        }}
      >
        {/* Información de Contacto */}
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
            Información de Contacto
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">Dirección: POR DEFINIR</Typography>
            <Typography variant="body2">Teléfono: 123-456-7890</Typography>
            <Typography variant="body2">Fax: 11111200</Typography>
            <Typography variant="body2">Email: Justshop@support.com</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5}>
            <IconButton sx={{ backgroundColor: "#3b5998", color: "#fff", borderRadius: "50%" }}>
              <Facebook fontSize="small" />
            </IconButton>
            <IconButton sx={{ backgroundColor: "#00acee", color: "#fff", borderRadius: "50%" }}>
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton sx={{ backgroundColor: "#c4302b", color: "#fff", borderRadius: "50%" }}>
              <YouTube fontSize="small" />
            </IconButton>
            <IconButton sx={{ backgroundColor: "#c8232c", color: "#fff", borderRadius: "50%" }}>
              <Pinterest fontSize="small" />
            </IconButton>
            <IconButton
              sx={{
                background:
                  "linear-gradient(#405de6, #833ab4, #c13584, #e1306c, #fd1d1d, #f56040, #fcaf45)",
                color: "#fff",
                borderRadius: "50%",
              }}
            >
              <Instagram fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {/* Información */}
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
            Información
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" sx={{ cursor: "pointer", ":hover": { color: "grey.300" } }}>
              Acerca de Nosotros
            </Typography>
            <Typography variant="body2" sx={{ cursor: "pointer", ":hover": { color: "grey.300" } }}>
              Políticas de Privacidad
            </Typography>
            <Typography variant="body2" sx={{ cursor: "pointer", ":hover": { color: "grey.300" } }}>
              Términos y Condiciones
            </Typography>
            <Typography variant="body2" sx={{ cursor: "pointer", ":hover": { color: "grey.300" } }}>
              Contáctanos
            </Typography>
          </Stack>
        </Stack>

        {/* Mi cuenta */}
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
            Mi Cuenta
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" sx={{ cursor: "pointer", ":hover": { color: "grey.300" } }}>
              Mi cuenta
            </Typography>
            <Typography variant="body2" sx={{ cursor: "pointer", ":hover": { color: "grey.300" } }}>
              Historial de órdenes
            </Typography>
            <Typography variant="body2" sx={{ cursor: "pointer", ":hover": { color: "grey.300" } }}>
              Lista de deseos
            </Typography>
            <Typography variant="body2" sx={{ cursor: "pointer", ":hover": { color: "grey.300" } }}>
              Reembolsos
            </Typography>
          </Stack>
        </Stack>

        {/* Boletín informativo */}
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
            Boletín informativo
          </Typography>
          <Typography variant="body2">
            Suscríbete a nuestros boletines ahora y mantente al día con nuevas
            colecciones y ofertas exclusivas.
          </Typography>
          <InputBase
            placeholder="Ingresa el correo aquí..."
            sx={{
              borderBottom: "2px solid #d2b495",
              color: "#fff",
              pb: 1.5,
              mt: 2,
            }}
          />
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "2rem",
              fontWeight: 600,
              px: 4,
              textTransform: "uppercase",
              fontSize: "0.9rem",
              ":hover": {
                backgroundColor: "background.default",
                color: "primary.main",
              },
            }}
          >
            Suscríbete
          </Button>
        </Stack>
      </Box>

      {/* Copyright */}
      <Box
        sx={{
          borderTop: "1px solid #d2b495",
          mt: 6,
          pt: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
          Desarrollado por Daniel Gamboa 
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
