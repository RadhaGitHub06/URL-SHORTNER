const { nanoid } = require('nanoid');

const generateUniqueShortcode = (db) => {
  let code;
  do {
    code = nanoid(7);
  } while (db.has(code));
  return code;
};

const isValidShortcode = (code) => /^[a-zA-Z0-9]{5,10}$/.test(code);

module.exports = {
  generateUniqueShortcode,
  isValidShortcode
};
