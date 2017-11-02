const bcrypt = require('bcrypt');

const validateHash = (plainPassword, hashedPassword) => {

  return bcrypt.compareSync(plainPassword, hashedPassword);

};

module.exports = validateHash;
