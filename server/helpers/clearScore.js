const Score = require('../models/Score');

const clearScore = () => {

  // Making sure this function only runs on test environment
  if (process.env.NODE_ENV === 'test') {

    Score
      .deleteMany({})
      .then(() => {
        console.log('Cleared `score` collection');
      });

  }

};

module.exports = clearScore;
