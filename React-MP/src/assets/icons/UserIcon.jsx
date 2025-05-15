import FaceIcon from '@mui/icons-material/Face';
import { styled } from '@mui/material/styles';

const UserIcon = styled(FaceIcon)(({ theme }) => ({
  height:'30px',
  width:'30px',
  color: theme.palette.primary.main, // Aplica estilos personalizados
  // Puedes agregar más estilos si es necesario
}));

export default UserIcon