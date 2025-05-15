import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const DeleteIcono = styled(DeleteIcon)(({ theme }) => ({
  height: '20px',
  width: '20px',
  color: "#ff6240",
  borderColor: "#ff6240",
  '&:hover': {
    backgroundColor: "rgba(255, 0, 0, 0.1)", // Color de fondo cuando pasas el mouse
    borderColor: "#ff6240"
  }
}));

export default DeleteIcono;