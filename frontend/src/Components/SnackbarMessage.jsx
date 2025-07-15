import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarMessage = ({ message, setMessage }) => (
  <Snackbar open={message.open} autoHideDuration={4000} onClose={() => setMessage({ ...message, open: false })}>
    <Alert severity={message.type} sx={{ width: '100%' }}>{message.text}</Alert>
  </Snackbar>
);

export default SnackbarMessage;
