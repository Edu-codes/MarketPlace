
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


const FormUpdateSubCat = ({ handleCerrarModal, handleChange, handleGuardar, formData, categoria }) => {

    return (
        <>

            <Modal open={true} onClose={handleCerrarModal}>
                <Box sx={styleModal}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Editar SubCategoria
                    </Typography>


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
                            name="idCat"
                            value={formData.idCat || ''}
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

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
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