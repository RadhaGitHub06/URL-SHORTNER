import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid,
  Chip,
  Stack,
  Tooltip,
  Divider
} from '@mui/material';
import { AssignmentTurnedIn, ContentCopy } from '@mui/icons-material';
import log from 'logging-middleware/logger';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [preferredUrl, setPreferredUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState({ open: false, type: '', text: '' });
  const [createdCount, setCreatedCount] = useState(0);

  useEffect(() => {
    log("frontend", "info", "App", "App component mounted successfully.");
  }, []);

  const handleShorten = async () => {
    if (createdCount >= 5) {
      setMessage({ open: true, type: 'error', text: '⚠️ You can only create up to 5 URLs per session.' });
      return;
    }

    if (!originalUrl.trim()) {
      setMessage({ open: true, type: 'error', text: 'Please enter a valid URL.' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/shorturls', {
        url: originalUrl,
        shortcode: preferredUrl || undefined,
        validity: validity ? parseInt(validity) : 30,
      });

      const data = response.data;
      setShortUrl(data.shortLink);
      setCreatedCount(prev => prev + 1);
      setMessage({ open: true, type: 'success', text: '🎉 URL shortened!' });
      log("frontend", "info", "shortener", `Shortened: ${data.shortLink}`);

      const statsRes = await axios.get(`http://localhost:3001/shorturls/${data.shortLink.split('/').pop()}`);
      setStats(statsRes.data);

    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server error';
      setMessage({ open: true, type: 'error', text: errMsg });
      log("frontend", "error", "shortener", errMsg);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setMessage({ open: true, type: 'info', text: 'Link copied!' });
  };

  return (
    <Box sx={{ bgcolor: '#fffefc', minHeight: '100vh', py: 4 }}>
      <AppBar position="static" sx={{ bgcolor: '#004d40' }}>
        <Toolbar>
          <Typography variant="h6">🔗 URL Shortener</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Paper elevation={1} sx={{ p: 4, borderRadius: 2, mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#004d40' }}>Create Short URL</Typography>
          <TextField
            fullWidth
            label="Original URL"
            variant="outlined"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Preferred Shortcode (optional)"
            variant="outlined"
            value={preferredUrl}
            onChange={(e) => setPreferredUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Validity in minutes (default: 30)"
            type="number"
            variant="outlined"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="success" fullWidth sx={{ py: 1.2 }} onClick={handleShorten}>
            ✂️ Shorten
          </Button>
        </Paper>

        {shortUrl && (
          <Paper elevation={2} sx={{ mt: 4, p: 3, borderLeft: '5px solid #004d40' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AssignmentTurnedIn color="success" />
              <Typography variant="body1" fontWeight={500}>Short URL:</Typography>
              <Tooltip title="Copy">
                <Chip
                  label={shortUrl}
                  clickable
                  onClick={handleCopy}
                  icon={<ContentCopy />}
                  variant="outlined"
                  color="success"
                />
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
        )}

        <Snackbar
          open={message.open}
          autoHideDuration={4000}
          onClose={() => setMessage({ ...message, open: false })}
        >
          <Alert severity={message.type} sx={{ width: '100%' }}>{message.text}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default App;
