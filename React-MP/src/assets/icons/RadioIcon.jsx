import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { styled } from '@mui/material/styles';

const RadioIcon = styled(RadioButtonUncheckedIcon)(({ theme }) => ({
  color: theme.palette.primary.main, // Aplica estilos personalizados
  width:'10px',
  height:'10px',
  marginRight: '10px'
  
  // Puedes agregar más estilos si es necesario
}));

export default RadioIcon;