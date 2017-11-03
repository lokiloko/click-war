const bcrypt = require('bcrypt');

const hashPassword = (plainPassword) => {

  const saltRounds = 8;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainPassword, salt);

  return hash;

};

module.exports = hashPassword;
