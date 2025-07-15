import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';

const Header = ({ onNavigate }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#004d40' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🔗 URL Shortener
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={() => onNavigate('shortener')}>Shorten URL</Button>
          <Button color="inherit" onClick={() => onNavigate('stats')}>Statistics Page</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;