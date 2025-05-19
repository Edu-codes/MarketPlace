import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};


const FormularioProductoModal = ({ handleEliminar, formData, categorias, handleChange, handleGuardar, handleCerrarModal, subCategorias, unidadMedida }) => {
  return (
    <Modal open={true} onClose={handleCerrarModal}>
      <Box sx={styleModal}>
        <Typography variant="h6" component="h2" gutterBottom>
          Editar Producto
        </Typography>

        <TextField
          fullWidth
          label="Nombre"
          name="nombrePro"
          value={formData.nombrePro}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Precio"
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Cantidad"
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Categoría</InputLabel>
          <Select
            name="idCat"
            value={formData.idCat || ''}
            onChange={handleChange}
            label="Categoría"
          >
            <MenuItem value="">Seleccione una opción</MenuItem>
            {categorias.map((cat) => (
              <MenuItem key={cat.id} value={cat.id.toString()}>
                {cat.nombreCat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Subcategoría</InputLabel>
          <Select
            name="subcatId"
            value={formData.subcatId || ''}
            onChange={handleChange}
            label="Subcategoría"
          >
            <MenuItem value="">Seleccione una opción</MenuItem>
            {subCategorias.map((subCat) => (
              <MenuItem key={subCat.id} value={subCat.id.toString()}>
                {subCat.nombreSubCat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Unidad de Medida</InputLabel>
          <Select
            name="unidadId"
            value={formData.unidadId || ''}
            onChange={handleChange}
            label="Unidad de Medida"
          >
            <MenuItem value="">Seleccione una opción</MenuItem>
            {unidadMedida.map((u) => (
              <MenuItem key={u.id} value={u.id.toString()}>
                {u.nombreUnidadMedida}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>

          <Button variant="contained" color="primary" onClick={handleGuardar} sx={{ mr: 1 }}>
            Guardar
          </Button>

          <Button variant="outlined" color="secondary" onClick={handleEliminar} sx={{ mr: 1 }}>
            Eliminar
          </Button>
          
          <Button variant="outlined" color="secondary" onClick={handleCerrarModal}>
            Cancelar
          </Button>


        </Box>
      </Box>
    </Modal>
  );
};



export default FormularioProductoModal;
