import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import { styled } from '@mui/material/styles';

const ElementoIcono = styled(LaptopChromebookIcon)(({ theme }) => ({
  height:'30px',
  width:'30px',
  color: theme.palette.primary.main, // Aplica estilos personalizados
  // Puedes agregar más estilos si es necesario
}));

export default ElementoIcono;