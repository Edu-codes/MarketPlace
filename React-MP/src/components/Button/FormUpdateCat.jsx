
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


const FormUpdateCat = ({ handleCerrarModal, handleChange, handleGuardar, formData, handleEliminar }) => {

    return (
        <>

            <Modal open={true} onClose={handleCerrarModal}>
                <Box sx={styleModal}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Editar Categoria
                    </Typography>


                    <TextField
                        fullWidth
                        label="Nombre"
                        name="nombreCat"
                        onChange={handleChange}
                        value={formData.nombreCat}
                        margin="normal"
                    >

                    </TextField>


                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button variant="contained" color="primary" onClick={handleGuardar} sx={{ mr: 1 }}>
                            Guardar
                        </Button>

                        <Button variant="outlined" color="secondary" onClick={handleEliminar}>
                            Eliminar
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


export default FormUpdateCat