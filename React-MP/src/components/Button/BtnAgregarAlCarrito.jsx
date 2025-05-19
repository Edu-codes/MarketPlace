import { Box } from "@mui/material"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";


export default function BtnAgregarAlCarrito({onClick}) {


    return (
        <>
            {/* Botón carrito */}

            <Box

                sx={{
                    justifySelf: "end",
                    width: 56,
                    height: 56,
                    border: "2px solid",
                    borderColor: "primary.main",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(6px)",
                    "&:hover": {
                        backgroundColor: "primary.main",
                        boxShadow: "0 6px 14px rgba(0, 0, 0, 0.3)",
                        "& svg": {
                            color: "#fff",
                            transform: "scale(1.1)",
                        },
                    },
                }}
            >
                <ShoppingBasketIcon
                    onClick = {onClick}
                    sx={{
                        fontSize: "1.8rem",
                        color: "primary.main",
                        transition: "all 0.3s ease",
                    }}
                />


            </Box>


        </>

    )
}