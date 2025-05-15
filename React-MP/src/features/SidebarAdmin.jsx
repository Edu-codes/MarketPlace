import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';



import HomeIcono from '../assets/icons/HomeIcon';
import ElementoIcono from '../assets/icons/ElementoIcono';
import RadioIcon from '../assets/icons/RadioIcon';


// Estilo para el enlace
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    borderRadius: 10,
    padding: 0,
    width: '100%',
    height: '50%',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.primary
    },
    '&:active': {
        backgroundColor: theme.palette.action.selected, // Color al hacer clic
        transform: 'scale(0.95)', // Reduce la escala del botón al hacer clic
    },
}));

function SidebarAdmin() {


    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Menu>

            <StyledMenuItem onClick={() => handleNavigation('Inicio')}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                        <HomeIcono sx={{ marginRight: 1, display: "flex" }} />
                    </Box>
                    <Box>
                        Home
                    </Box>

                </Box>

            </StyledMenuItem>

            <SubMenu
                label={
                    <>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <ElementoIcono />
                            <span>Administrar</span>
                        </Box>
                    </>
                }
            >
                <StyledMenuItem onClick={() => handleNavigation('Productos')}>


                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <RadioIcon sx={{ marginRight: 1, display: "flex" }} />
                        </Box>
                        <Box>
                            Productos
                        </Box>
                    </Box>

                </StyledMenuItem>
                <StyledMenuItem onClick={() => handleNavigation('Categorias')}>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <RadioIcon sx={{ marginRight: 1, display: "flex" }} />
                        </Box>
                        <Box>
                            Categorias
                        </Box>
                    </Box>

                </StyledMenuItem>
                <StyledMenuItem onClick={() => handleNavigation('SubCategorias')}>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <RadioIcon sx={{ marginRight: 1, display: "flex" }} />
                        </Box>
                        <Box>
                            Subcategorias
                        </Box>
                    </Box>

                </StyledMenuItem>
                {/* <StyledMenuItem onClick={() => handleNavigation('/Laptops')}>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <RadioIcon sx={{ marginRight: 1, display: "flex" }} />
                        </Box>
                        <Box>
                            Categorias
                        </Box>
                    </Box>

                </StyledMenuItem> */}

                <Divider />
            </SubMenu>

        </Menu>
    );
}

export default SidebarAdmin;
