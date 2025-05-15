import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { styled } from '@mui/material/styles';

const VistaIcon = styled(RemoveRedEyeIcon)(({ theme }) => ({
  height: '20px',
  width: '20px',
  color: theme.palette.primary.main,  // Aplica estilos personalizados
  // Puedes agregar más estilos si es necesario
}));

export default VistaIcon;