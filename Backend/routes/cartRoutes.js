const express = require('express');
const { getCart, addItemToCart, updateCartItem, removeItemFromCart } = require('../controllers/CartController');
const { protect } = require('../middleware/auth');
const { check } = require('express-validator');
const { validateRequest } = require('../middleware/errorHandler');

const router = express.Router();

router.use(protect);

router.get('/', getCart);

router.post('/', [
  check('productId', 'Product ID is required').not().isEmpty(),
  check('quantity', 'Quantity must be at least 1').isInt({ min: 1 }),
  validateRequest
], addItemToCart);

router.put('/:productId', [
  check('quantity', 'Quantity must be at least 1').isInt({ min: 1 }),
  validateRequest
], updateCartItem);

router.delete('/:productId', removeItemFromCart);

module.exports = router;
