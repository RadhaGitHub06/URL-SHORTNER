import React from 'react';
import { Paper, Stack, Typography, Chip, Tooltip, Divider, Grid } from '@mui/material';
import { AssignmentTurnedIn, ContentCopy } from '@mui/icons-material';

const ShortenedResult = ({ shortUrl, stats, handleCopy }) => {
  if (!shortUrl) return null;

  return (
    <Paper elevation={2} sx={{ mt: 4, p: 3, borderLeft: '5px solid #004d40' }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <AssignmentTurnedIn color="success" />
        <Typography variant="body1" fontWeight={500}>Short URL:</Typography>
        <Tooltip title="Copy">
          <Chip label={shortUrl} clickable onClick={handleCopy} icon={<ContentCopy />} variant="outlined" color="success" />
        </Tooltip>
      </Stack>
      <Divider sx={{ my: 2 }} />
      {stats && (
        <Grid container spacing={2}>
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

export default ShortenedResult;
