const express = require('express');
const router = express.Router();
const urlDatabase = require('../data/store');
const { nanoid } = require('nanoid');
const isURL = require('validator/lib/isURL');
const { generateUniqueShortcode, isValidShortcode } = require('../utils/helpers');
const log = require('../middleware/logger');

router.get('/', (req, res) => {
  res.send('Afford Medical URL Shortener Backend is running. Use POST /shorturls to shorten URLs.');
});

// Create Short URL
router.post('/shorturls', (req, res) => {
  const { url, validity, shortcode } = req.body;
  if (!url || !isURL(url, { require_protocol: true })) {
    log("backend", "error", "controller", `Invalid URL: ${url}`);
    return res.status(400).json({ error: "Invalid or missing 'url'. Must include http:// or https://." });
  }

  let code = shortcode;
  if (code) {
     if (!isValidShortcode(code)) {
      return res.status(400).json({ error: "Shortcode must be alphanumeric (5-10 characters)." });
    }
 if (urlDatabase.has(code)) {
       return res.status(409).json({ error: "Shortcode already exists. Choose another." });
    }
  } else {
    code = generateUniqueShortcode(urlDatabase);
  }
  

  const expiry = new Date(Date.now() + (validity > 0 ? validity : 30) * 60000);
  const createdAt =new Date();

  urlDatabase.set(code, {
    originalUrl: url,
     expiryDate: expiry,
    createdAt,
    clicks: [],
    custom: !!shortcode
  });

  res.status(201).json({
    shortLink: `http://localhost:3001/${code}`,
    expiry: expiry.toISOString()
  });
});

// Get Stats
router.get('/shorturls/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const data = urlDatabase.get(shortcode);
  if (!data) return res.status(404).json({ error: "Short URL not found." });

  const now = new Date();
  if (now > data.expiryDate) {
    return res.status(200).json({
      message: "Short URL has expired.",
      ...data,
      shortLink: `http://localhost:3001/${shortcode}`,
      expired: true
    });
  }

  res.status(200).json({
    ...data,
    shortLink: `http://localhost:3001/${shortcode}`,
    expired: false
  });
});

// Redirect
router.get('/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const data = urlDatabase.get(shortcode);
  if (!data) return res.status(404).send("Short URL not found or expired.");

  if (new Date() > data.expiryDate) {
    urlDatabase.delete(shortcode);
    return res.status(410).send("Short URL expired.");
  }

  data.clicks.push({
    timestamp: new Date().toISOString(),
    source: req.headers.referer || 'direct',
    geo: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
  });

  urlDatabase.set(shortcode, data);
  res.redirect(302, data.originalUrl);
});

module.exports = router;