import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import SavingsForm from '../../comps/pages/SavingsForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  
  const AddSavingsModal = ({ open, onClose }) => {
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
    
            <IconButton onClick={onClose}>
            </IconButton>
          </Box>
          <SavingsForm onClose={onClose} />
        </Box>
      </Modal>
    );
  };
  
  export default AddSavingsModal;