const express = require('express');
const {
  createProduct,
  getAllProduct,
  getDetailProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const authenticateToken = require('../utils/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, createProduct);
router.get('/', authenticateToken, getAllProduct);
router.get('/:id', authenticateToken, getDetailProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;
