import { Button, TextField, Box } from "@mui/material"
import { useState } from "react"

export function CountCantidad({cantidad, setCantidad}) {


    const handleSuma = () => {
        const suma = cantidad + 1
        setCantidad(suma)
        console.log(cantidad)
    }
    const handleResta = () => {

        if (cantidad > 0) {
            const resta = cantidad - 1
            setCantidad(resta)
            console.log(cantidad)
        }
    }

    const handleChange = (e) => {
        var value = parseInt(e.target.value)
        if (value >= 0) {
            setCantidad(value)
        }
    }
    return (
        <>

            <Box
                sx={{ display: 'flex', alignItems: 'center' }}>

                <Box >
                    <Button
                        variant="contained"
                        sx={{
                            minWidth: 30,
                            height: 55,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            px: 0,
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                        onClick={handleResta}>

                        -

                    </Button>
                </Box>
                <Box>
                    <TextField
                        sx={{
                            height: 50,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderLeft: 'none',
                            borderRight: 'none',
                            fontWeight: 'bold',
                        }}
                        onChange={handleChange}
                        value={cantidad}
                    />
                </Box>

                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            minWidth: 30,
                            height: 55,
                            backgroundColor: 'primary.main',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            px: 0,
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                        onClick={handleSuma}
                    >
                        +</Button>
                </Box>
            </Box >

        </>
    )
}