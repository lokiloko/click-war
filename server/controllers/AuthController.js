require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validateHash = require('../helpers/validateHash');

class AuthController {

  static register (req, res) {

    User
      .create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

  static login (req, res) {

    User
      .findOne({ username: req.body.username })
      .then((user) => {

        if (!user) {
          res.status(403).json({
            message: 'Username/Password is wrong'
          });
        } else {

          const correctPassword = validateHash(req.body.password, user.password);

          if (correctPassword) {

            const payload = {
              _id: user._id,
              name: user.name,
              username: user.username
            };

            res.status(200).json({
              access_token: jwt.sign(payload, process.env.JWT_SECRET)
            });

          } else {
            res.status(403).json({
              message: 'Username/Password is wrong'
            });
          }

        }

      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

}

module.exports = AuthController;
