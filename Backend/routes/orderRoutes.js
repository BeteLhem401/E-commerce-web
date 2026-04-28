const express = require('express');
const { checkout, getMyOrders, getOrder } = require('../controllers/OrderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/checkout', checkout);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrder);

module.exports = router;
