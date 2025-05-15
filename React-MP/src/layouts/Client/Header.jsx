import React from 'react';
import { AppBar, Box, Typography, IconButton, InputBase, Link as RouterLink } from '@mui/material';
import MuiLink from '@mui/material/Link';

import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import BtnLogOut from '../../components/Button/BtnLogOut';

import { useNavigate } from 'react-router';




export default function HeaderCliente() {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <header>
            {/* Top section */}
            <Box sx={{ backgroundColor: 'secundary.main' }}>
                <Box className="container" sx={{ maxWidth: 1200, margin: '0 auto' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '2rem 0',
                        }}
                    >
                        {/* Soporte */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <i className="fa-sharp fa-solid fa-headset" style={{ fontSize: '3.3rem' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
                                <Typography variant="body1">Línea De Soporte</Typography>
                                <Typography variant="body2">123-456-7890</Typography>
                            </Box>
                        </Box>

                        {/* Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Typography variant="h3" sx={{ textTransform: 'uppercase', letterSpacing: '-1px' }}>
                                <MuiLink href="inicio" underline="none" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <StoreIcon sx={{ width: "4rem", height: "4rem" }} />
                                    Just Shop
                                </MuiLink>
                            </Typography>
                        </Box>

                        {/* Usuario */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                            {/* <MuiLink href="registro.html" underline="none">
                              <PersonIcon  sx={{ width: "2rem", height: "2rem" }}/>
                            </MuiLink> */}
                            <ShoppingCartIcon sx={{ width: "2rem", height: "2rem" }} />
                            {/* <Typography variant="body1">Tu cesta</Typography>
                                <Typography variant="body2">(0)</Typography> */}
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Navbar */}
            <Box sx={{ backgroundColor: 'primary.main' }}>
                <Box className="container" sx={{ maxWidth: 1200, margin: '0 auto' }}>
                    <Box
                        component="nav"
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem 0',
                        }}
                    >
                        {/* <IconButton >
                            <MenuIcon />
                        </IconButton> */}

                        {/* Menú */}
                        <Box component="ul" sx={{ display: 'flex', listStyle: 'none', gap: '1.5rem', m: 0, p: 0, fontWeight: 'bold' }}>

                            <li><MuiLink onClick={() => handleNavigation('')} underline="none" color="text.primary" sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                                px: 2,
                                py: 1.5,
                                borderRadius: 1,
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: '#fff'
                                },
                            }}>Inicio</MuiLink></li>
                            <li>
                                <MuiLink onClick={() => handleNavigation('Productos')} underline="none" color="text.primary" sx={{
                                    display: 'flex',

                                    alignItems: 'center',
                                    height: '100%',
                                    px: 2,
                                    py: 1.5,
                                    cursor: 'pointer',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        color: '#fff'

                                    },

                                }}>Productos</MuiLink></li>
                            <li><MuiLink href="#" underline="none" color="text.primary" sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                                px: 2,
                                py: 1.5,
                                cursor: 'pointer',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: '#fff'
                                },
                            }}>Descuentos</MuiLink></li>
                            <li><MuiLink onClick={()=>handleNavigation('Categorias')} underline="none" color="text.primary" sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                                px: 2,
                                py: 1.5,
                                cursor: 'pointer',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: '#fff'
                                },
                            }}>Categorias</MuiLink></li>

                        </Box>

                        <BtnLogOut />

                        {/* Buscar */}
                        {/* <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: '#f0f0f0',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                            }}
                        >
                            <InputBase placeholder="Buscar..." />
                            <IconButton type="submit">
                                <SearchIcon />
                            </IconButton>
                        </Box> */}
                    </Box>
                </Box>
            </Box>
        </header>
    );
}
