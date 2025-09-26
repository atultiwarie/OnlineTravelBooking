const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const authMiddleware = require("../middlewares/authMiddleware");


router.post("/create", authMiddleware, createBooking);


router.post("/payment/order", authMiddleware, createOrder);
router.post("/payment/verify", authMiddleware, verifyPayment);

module.exports = router;
