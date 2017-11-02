const User = require('../models/User');

const addOneDummyUser = () => {

  // Making sure this function only runs on test environment
  if (process.env.NODE_ENV === 'test') {

    const dummy = {
      name: 'Dimitri Wahyudiputra',
      username: 'deathmitri',
      password: 'secret'
    };

    const getUserId = new Promise((resolve, reject) => {

      User
      .create(dummy)
      .then((user) => {
        console.log('Created one dummy user');
        resolve(user._id);
      })
      .catch((err) => {
        console.error(err);
      });

    });

    return Promise.resolve(getUserId);

  }

};

module.exports = addOneDummyUser;
