const express = require('express');
const {
  createUser,
  loginUser,
  getAllUser,
  getDetailUser,
  updateUser,
} = require('../controllers/user.controller');
const authenticateToken = require('../utils/authMiddleware');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/', authenticateToken, getAllUser);
router.get('/:id', authenticateToken, getDetailUser);
router.put('/:id', authenticateToken, updateUser);

module.exports = router;
