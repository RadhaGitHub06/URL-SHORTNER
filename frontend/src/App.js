// // frontend/src/App.js
// import React, { useState, useEffect } from 'react';

// import UrlShortenerPage from './UrlShortenerPage'; 
    
// import log from 'logging-middleware/logger'; // Correct import path for local package

// function App() {
//   return (
//    <div>
//       <UrlShortenerPage />
//    </div>
     
    

//   );
// }

// export default App;

// File: frontend/App.jsx
import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import log from 'logging-middleware/logger';
import Header from './Components/Header';
import ShortenerForm from './Components/ShortenerForm';
import ShortenedResult from './Components/ShortenedResult';
import SnackbarMessage from './Components/SnackbarMessage';
import StatsPage from './Components/StatsPage';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [preferredUrl, setPreferredUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState({ open: false, type: '', text: '' });
  const [createdCount, setCreatedCount] = useState(0);
  const [page, setPage] = useState('shortener');

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
      <Header onNavigate={setPage} />
      <Container maxWidth="sm">
        {page === 'shortener' ? (
          <>
            <ShortenerForm
              originalUrl={originalUrl}
              setOriginalUrl={setOriginalUrl}
              preferredUrl={preferredUrl}
              setPreferredUrl={setPreferredUrl}
              validity={validity}
              setValidity={setValidity}
              handleShorten={handleShorten}
            />
            <ShortenedResult shortUrl={shortUrl} stats={stats} handleCopy={handleCopy} />
          </>
        ) : (
          <StatsPage />
        )}
        <SnackbarMessage message={message} setMessage={setMessage} />
      </Container>
    </Box>
  );
}

export default App;