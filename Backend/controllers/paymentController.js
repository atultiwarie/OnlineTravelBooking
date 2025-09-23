const Razorpay = require("razorpay");
const Booking = require("../models/postgres/bookingModel");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
const createOrder = async (req, res) => {
  try {
    const { bookingId, amount } = req.body; 
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: bookingId,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify payment signature
const verifyPayment = async (req, res) => {
  const crypto = require("crypto");
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId,
  } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    await Booking.update({ status: "Paid" }, { where: { id: bookingId } });
    res.status(200).json({ message: "Payment successful" });
  } else {
    res.status(400).json({ message: "Invalid signature" });
  }
};

module.exports = { createOrder, verifyPayment };
