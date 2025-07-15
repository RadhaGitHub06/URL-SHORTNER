const axios = require('axios');

// Replace with your valid token
const ACCESS_TOKEN = 'your_access_token_here';

const MAX_LENGTH = 50;

const log = async (stack, level, pkg, message) => {
  // Truncate long messages
  const msg = message.length > MAX_LENGTH
    ? message.slice(0, MAX_LENGTH - 3) + '...'
    : message;

  try {
    await axios.post('http://20.244.56.144/evaluation-service/logs', {
      stack,
      level,
      package: pkg,
      message: msg
    }, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};

module.exports = log;
