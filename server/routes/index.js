const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const scoreRoutes = require('./scores');

router.use('/auth', authRoutes);
router.use('/scores', scoreRoutes);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Click War API Index'
  });
});

module.exports = router;
