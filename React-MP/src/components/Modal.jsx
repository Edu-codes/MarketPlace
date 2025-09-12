import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ModalUsuario({ isOpen, onClose, title, children }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{ minWidth: '100%' }}
    >
      <Box sx={{ ...style }}>
        <Button onClick={onClose} style={{ float: 'right' }}>X</Button>
        <h2 id="parent-modal-title">{title}</h2>
        <div id="parent-modal-description">{children}</div>
      </Box>
    </Modal>
  );
}

