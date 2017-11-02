const User = require('../models/User');

const clearUser = () => {

  // Making sure this function only runs on test environment
  if (process.env.NODE_ENV === 'test') {

    User
      .deleteMany({})
      .then(() => {
        console.log('Cleared `users` collection');
      });

  }

};

module.exports = clearUser;
