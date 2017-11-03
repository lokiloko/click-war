const express = require('express');
const router = express.Router();

const ScoreController = require('../controllers/ScoreController');

router.get('/', ScoreController.fetchAll);
router.get('/:id', ScoreController.fetchById);
router.get('/user/:user_id', ScoreController.fetchByUserId);
router.post('/', ScoreController.create);
router.delete('/:id', ScoreController.delete);

module.exports = router;
