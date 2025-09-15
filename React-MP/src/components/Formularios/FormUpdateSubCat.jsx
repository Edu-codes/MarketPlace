
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

import BtnFotos from '../Button/Admin/BtnFoto';
import { fotoPorId } from '../../services/foto';
import { useState, useEffect } from 'react';

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


const FormUpdateSubCat = ({ handleCerrarModal, handleNuevaImagen, handleChange, handleGuardar, formData, categoria, fotoSubCat, cargarFotos }) => {

    return (
        <>

            <Modal open={true} onClose={handleCerrarModal}>


                <Box sx={styleModal}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Editar SubCategoria
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
                    {/* {sendFoto && (

                        <img
                            src={foto}
                            alt="Arroz"
                            style={{
                                width: "50%",
                                height: "50%",
                                borderRadius: "0.5rem",
                                objectFit: "cover",
                                cursor: "pointer"
                            }}
                        />
                    )}  */}
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="nombreSubCat"
                        onChange={handleChange}
                        value={formData.nombreSubCat}
                        margin="normal"
                    >

                    </TextField>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Categoria</InputLabel>
                        <Select
                            name="categoriaId"
                            value={formData.categoriaId || ''}
                            onChange={handleChange}
                            label="Categoria"
                        >
                            <MenuItem value="">Seleccione una opción</MenuItem>
                            {categoria.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.nombreCat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>



                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <BtnFotos
                            fotosPorId={fotoSubCat} // ✅ este sí es el array de fotos
                            recargarFotos={cargarFotos}// si necesitas recargar después de eliminar
                        />
                        <Button variant="contained" color="primary" onClick={handleGuardar} sx={{ mr: 1 }}>
                            Guardar
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCerrarModal}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Modal>




        </>
    )

}

export default FormUpdateSubCat