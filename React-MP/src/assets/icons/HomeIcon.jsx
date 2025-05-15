import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';

const HomeIcono = styled(HomeIcon)(({ theme }) => ({
  height:'30px',
  width:'30px',
  color: theme.palette.primary.main, // Aplica estilos personalizados
  // Puedes agregar más estilos si es necesario
}));

export default HomeIcono;