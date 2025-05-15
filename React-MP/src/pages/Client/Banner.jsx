import { Box, Typography, Button } from "@mui/material"
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";


export default function Banner() {

    const features = [
        {
            icon: <LocalShippingIcon sx={{ fontSize: "2.7rem", color: "primary.main" }} />,
            title: "Envío gratuito",
            subtitle: "En pedidos",
        },
        {
            icon: <AccountBalanceWalletIcon sx={{ fontSize: "2.7rem", color: "primary.main" }} />,
            title: "Reembolso",
            subtitle: "100% garantía de devolución",
        },
        {
            icon: <AccountBalanceWalletIcon sx={{ fontSize: "2.7rem", color: "primary.main" }} />,
            title: "Tarjeta Regalo",
            subtitle: "Ofrece bonos especiales",
        },
        {
            icon: <HeadsetMicIcon sx={{ fontSize: "2.7rem", color: "primary.main" }} />,
            title: "Atención al cliente",
            subtitle: "Llámenos al 123-456-7890",
        },
    ];

    return (

        <>



            <Box
                sx={{
                    height: "60rem",
                    backgroundImage: `linear-gradient(100deg, #00000080, #00000020), url("/public/banner.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "90rem",
                        margin: "0 auto",
                        padding: "25rem 2rem 0",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: "primary.main",
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            mb: 1,
                        }}
                    >
                        Buenos Productos
                    </Typography>

                    <Typography
                        variant="h2"
                        sx={{
                            color: "#fff",
                            fontSize: "3.5rem",
                            fontWeight: 500,
                            lineHeight: 1.2,
                        }}
                    >
                        100% Productos Frescos,
                        <br />
                        Productos Seleccionados
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            mt: 4,
                            textTransform: "uppercase",
                            borderRadius: "3rem",
                            px: 4,
                            py: 1.5,
                            backgroundColor: "primary.main",
                            color: "#fff",
                            fontWeight: 600,
                            "&:hover": {
                                backgroundColor: "primary.dark",
                            },
                        }}
                    >
                        Comprar ahora
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
                    gap: "3rem",
                    py: "3rem",
                    maxWidth: "120rem",
                    mx: "auto",
                    px: 2,
                }}
            >
                {features.map((feature, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "1.5rem",
                            backgroundColor: "#00000040",
                            borderRadius: "1rem",
                            py: "1.5rem",
                        }}
                    >
                        {feature.icon}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "1.2rem",
                                    color: "text.primary",
                                }}
                            >
                                {feature.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#777",
                                    fontWeight: 500,
                                }}
                            >
                                {feature.subtitle}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>

        </>
    )
}