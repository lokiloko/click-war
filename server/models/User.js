require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connection.openUri(
  process.env.MONGO_URL +
  '_' +
  process.env.NODE_ENV +
  (process.env.MONGO_URL_QUERY || '')
);

const Schema = mongoose.Schema;

const hashPassword = require('../helpers/hashPassword');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  username: {
    type: String,
    unique: [true, 'Username already exist'],
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

UserSchema.pre('save', function (next) {

  this.password = hashPassword(this.password);

  next();

});

module.exports = mongoose.model('User', UserSchema);
