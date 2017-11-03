const Score = require('../models/Score');
const User = require('../models/User');

class ScoreController {

  static fetchAll (req, res) {

    Score
      .find({})
      .populate('winner')
      .populate('loser')
      .sort({ created_at: -1 })
      .then((scores) => {
        res.status(200).json(scores);
      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

  static fetchById (req, res) {

    Score
      .findOne({ _id: req.params.id })
      .populate('winner')
      .populate('loser')
      .then((score) => {
        if (score) {
          res.status(200).json(score);
        } else {
          res.status(404).json({});
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).json({});
        } else {
          res.status(400).json(err);
        }
      });

  }

  static fetchByUserId (req, res) {

    User
      .findOne({ _id: req.params.user_id })
      .then((user) => {
        if (user) {

          Score
            .find({ $or: [
              { winner: req.params.user_id },
              { loser: req.params.user_id }
            ] })
            .populate('winner')
            .populate('loser')
            .then((scores) => {
              res.status(200).json(scores);
            })
            .catch((err) => {
              res.status(400).json(err);
            });

        } else {
          res.status(404).json({});
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).json({});
        } else {
          res.status(400).json(err);
        }
      });

  }

  static create (req, res) {

    Promise.all([
      User.findOne({ username: req.body.winner }),
      User.findOne({ username: req.body.loser })
    ])
      .then((users) => {

        const winnerId = users[0]._id;
        const loserId = users[1]._id;

        Score
        .create({
          winner: winnerId,
          loser: loserId,
          winner_score: req.body.winner_score,
          loser_score: req.body.loser_score
        })
        .then((score) => {
          res.status(201).json(score);
        })
        .catch((err) => {
          res.status(400).json(err);
        });

      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

  static delete (req, res) {

    Score
      .findOne({ _id: req.params.id })
      .then((score) => {

        if (!score) {
          res.status(404).json({});
        } else {

          Score
            .deleteOne({ _id: req.params.id })
            .then((response) => {
              res.status(200).json(score);
            })
            .catch((err) => {
              res.status(400).json(err);
            });

        }

      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).json({});
        } else {
          res.status(400).json(err);
        }
      });

  }

}

module.exports = ScoreController;
