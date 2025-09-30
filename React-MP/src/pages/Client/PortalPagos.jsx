import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

import { useCart } from '../../context/CartContext';


export default function PortalPagos() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const { productosCarrito, handleEliminarDelCarrito, handleCarrito, totalFormateado } = useCart();
    useEffect(() => {
        handleCarrito(); // carga carrito desde localStorage al montar
    }, []);

    const steps = [
        {
            label: 'Select campaign settings',
            description: (

                <Box>
                    {productosCarrito.length === 0 ? (
                        <p>Tu carrito está vacío</p>

                    ) : (
                        productosCarrito.map((producto) => {
                            const precioPorCantidad = producto.precio * producto.cantidad;
                            return (
                                <Paper
                                    key={producto.referencia}
                                    elevation={3}
                                    sx={{
                                        padding: 1,
                                        marginBottom: "1rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                    <Box>
                                        <img src={producto.im} alt="" />
                                    </Box>
                                    <span>
                                        {producto.nombrePro} - ${precioPorCantidad} x {producto.cantidad}
                                    </span>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleEliminarDelCarrito(producto.referencia)}
                                    >
                                        X
                                    </Button>


                                </Paper>

                            )
                        })
                    )}

                    <Box
                        sx={{
                            width: "100%",
                            backgroundColor: "white",
                            marginTop: "1rem",
                        }}>

                        TOTAL: {totalFormateado}

                    </Box>
                </Box>
            ),

        },
        {
            label: 'Create an ad group',
            description:
                'An ad group contains one or more ads which target a shared set of keywords.',
        },
        {
            label: 'Create an ad',
            description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
        },
    ];




    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >


            <Paper
                elevation={3}
                sx={{
                    padding: 1,
                    marginTop: "2rem",
                    width: "50%"
                }}
            >
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === steps.length - 1 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>

                                <Typography>{step.description}</Typography>

                                <Box sx={{ mb: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >

                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Paper>
        </Box>
    );
}