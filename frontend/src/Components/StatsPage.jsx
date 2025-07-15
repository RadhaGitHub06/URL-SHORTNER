import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import axios from 'axios';

const StatsPage = () => {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const handleFetchStats = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/shorturls/${shortcode}`);
      setStats(response.data);
      setError('');
    } catch (err) {
      setStats(null);
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 4, borderRadius: 2, mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#004d40' }}>Check URL Stats</Typography>
      <TextField
        fullWidth
        label="Enter Shortcode"
        variant="outlined"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="#004d40" onClick={handleFetchStats}> Get Statistics </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {stats && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}><strong>Original:</strong> {stats.originalUrl}</Grid>
          <Grid item xs={12}><strong>Shortened:</strong> {stats.shortLink}</Grid>
          <Grid item xs={6}><strong>Created:</strong><br />{new Date(stats.creationDate).toLocaleString()}</Grid>
          <Grid item xs={6}><strong>Expires:</strong><br />{new Date(stats.expiryDate).toLocaleString()}</Grid>
          <Grid item xs={12}><strong>Total Clicks:</strong> {stats.totalClicks}</Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default StatsPage;
