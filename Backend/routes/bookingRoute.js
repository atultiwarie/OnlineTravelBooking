const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

// Create booking from cart
router.post("/create", createBooking);

// Payment routes
router.post("/payment/order", createOrder);
router.post("/payment/verify", verifyPayment);

module.exports = router;
