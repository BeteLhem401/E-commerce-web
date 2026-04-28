const express = require('express');
const {
  addProduct, updateProduct, deleteProduct,
  addCategory, getCategories,
  getUsers, getOrders, updateOrderStatus
} = require('../controllers/AdminController');
const { protect, authorize } = require('../middleware/auth');
const { check } = require('express-validator');
const { validateRequest } = require('../middleware/errorHandler');

const router = express.Router();

router.use(protect);
router.use(authorize('Admin'));

const upload = require('../middleware/uploadMiddleware');

// Product Routes
router.post('/products', upload.single('image'), [
  check('name', 'Name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('price', 'Price must be a positive number').isFloat({ min: 0 }),
  check('stock', 'Stock must be at least 0').isInt({ min: 0 }),
  check('category', 'Category is required').not().isEmpty(),
  validateRequest
], addProduct);

router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Category Routes
router.post('/categories', [
  check('name', 'Category name is required').not().isEmpty(),
  validateRequest
], addCategory);

router.get('/categories', getCategories);

// User Routes
router.get('/users', getUsers);

// Order Routes
router.get('/orders', getOrders);
router.put('/orders/:id/status', [
  check('status', 'Status is required').not().isEmpty(),
  check('status', 'Invalid status').isIn(['Pending', 'Shipped', 'Delivered']),
  validateRequest
], updateOrderStatus);

module.exports = router;
