const log = require('./logger');

module.exports = (err, req, res, next) => {
  log("backend", "error", "handler", `Unhandled error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send('An unexpected server error occurred.');
};