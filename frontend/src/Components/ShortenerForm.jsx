import React from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';

const ShortenerForm = ({
  originalUrl,
  setOriginalUrl,
  preferredUrl,
  setPreferredUrl,
  validity,
  setValidity,
  handleShorten
}) => (
  <Paper elevation={1} sx={{ p: 4, borderRadius: 2, mt: 4 }}>
    <Typography variant="h5" sx={{ mb: 2, color: '#004d40' }}>Create Short URL</Typography>
    <TextField fullWidth label="Original URL" variant="outlined" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} sx={{ mb: 2 }} />
    <TextField fullWidth label="Preferred Shortcode (optional)" variant="outlined" value={preferredUrl} onChange={(e) => setPreferredUrl(e.target.value)} sx={{ mb: 2 }} />
    <TextField fullWidth label="Validity in minutes (default: 30)" type="number" variant="outlined" value={validity} onChange={(e) => setValidity(e.target.value)} sx={{ mb: 3 }} />
    <Button variant="contained" color="success" fullWidth sx={{ py: 1.2 }} onClick={handleShorten}>✂️ Shorten</Button>
  </Paper>
);

export default ShortenerForm;
