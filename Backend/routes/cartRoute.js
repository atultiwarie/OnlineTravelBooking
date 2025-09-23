const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, addToCart);
router.delete('/:cartId', authMiddleware, removeFromCart);
router.get('/', authMiddleware, getCart);

module.exports = router;
