import BorderColorIcon from '@mui/icons-material/BorderColor';
import { styled } from '@mui/material/styles';

const UpdateIcon = styled(BorderColorIcon)(({ theme }) => ({
  height:'20px',
  width:'20px',
  color: 'success' // Aplica estilos personalizados
  // Puedes agregar más estilos si es necesario
}));

export default UpdateIcon;