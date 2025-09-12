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
import BtnFotos from "../Button/Admin/BtnFoto";

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


const FormularioProductoModal = ({ handleEliminar, handleNuevaImagen, formData, estado, handleChange, handleGuardar, handleCerrarModal, cargarFotos, subCategorias, unidadMedida, fotoProductos }) => {
  return (
    <Modal open={true} onClose={handleCerrarModal}>
      <Box sx={styleModal}>
        <Typography variant="h6" component="h2" gutterBottom>
          Editar Producto
        </Typography>
        <Button
          variant="contained"
          component="label"
          color="primary"
        >
          <input
            type="file"
            hidden
            onChange={handleNuevaImagen}

          />
          Subir Foto
        </Button>
        <TextField
          fullWidth
          label="Nombre"
          name="NombrePro"
          value={formData.NombrePro}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Precio"
          type="number"
          name="Precio"
          value={formData.Precio}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Cantidad"
          type="number"
          name="Stock"
          value={formData.Stock}
          onChange={handleChange}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Subcategoría</InputLabel>
          <Select
            name="SubCategoriaId"
            value={formData.SubCategoriaId || ''}
            onChange={handleChange}
            label="SubCategoría"
          >
            <MenuItem value="">Seleccione una opción</MenuItem>
            {subCategorias.map((subCat) => (
              <MenuItem key={subCat.Id} value={subCat.id.toString()}>
                {subCat.nombreSubCat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Estado</InputLabel>
          <Select
            name="EstadoId"
            value={formData.EstadoId || ''}
            onChange={handleChange}
            label="estado"
          >
            <MenuItem value="">Seleccione una opción</MenuItem>
            {
              estado.map((est) => (
                <MenuItem key={est.Id} value={est.id.toString()}>
                  {est.nombre}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Unidad de Medida</InputLabel>
          <Select
            name="UniMedId"
            value={formData.UniMedId || ''}
            onChange={handleChange}
            label="Unidad de Medida"
          >
            <MenuItem value="">Seleccione una opción</MenuItem>
            {unidadMedida.map((u) => (
              <MenuItem key={u.id} value={u.id.toString()}>
                {u.nombreUniMed}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Descripcion"
          type="text"
          name="Descripcion"
          value={formData.Descripcion}
          onChange={handleChange}
          margin="normal"
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>

          <BtnFotos
            fotosPorId={fotoProductos} // ✅ este sí es el array de fotos
            recargarFotos={cargarFotos}// si necesitas recargar después de eliminar
          />

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
