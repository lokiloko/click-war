require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connection.openUri(
  process.env.MONGO_URL +
  '_' +
  process.env.NODE_ENV +
  (process.env.MONGO_URL_QUERY || '')
);

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Winner is required']
  },
  loser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Loser is required']
  },
  winner_score: {
    type: Number,
    required: [true, 'Winner score is required']
  },
  loser_score: {
    type: Number,
    required: [true, 'Loser score is required']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Score', ScoreSchema);
