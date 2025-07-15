const log = require('./logger');

module.exports = (req, res, next) => {
  const timestamp = new Date().toISOString();
  log("backend", "info", "middleware", `[${timestamp}] ${req.method} ${req.originalUrl}`);
  if (['POST', 'PUT'].includes(req.method) && req.body && Object.keys(req.body).length) {
    log("backend", "info", "handler", `Body: ${JSON.stringify(req.body)}`);
  }
  next();
};