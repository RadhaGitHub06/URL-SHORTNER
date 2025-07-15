const express = require('express');
const cors = require('cors');
const log = require('./middleware/logger');
const routes = require('./routes');

const app = express();
const PORT = 3001;

// --- Middleware Setup ---
app.use(cors());
app.use(express.json());
app.use(require('./middleware/loggingMiddleware'));

// --- Routes ---
app.use('/', routes);

// --- Error Handler ---
app.use(require('./middleware/errorHandler'));

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Backend URL Shortener running on http://localhost:${PORT}`);
  log("backend", "info", "service", `Server started on port ${PORT}`);
});
