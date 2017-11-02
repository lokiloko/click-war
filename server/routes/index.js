const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');

router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Click War API Index'
  });
});

module.exports = router;
