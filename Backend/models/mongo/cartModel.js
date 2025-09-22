const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: String, 
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  roomType: String, 
  quantity: Number,
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  guests: { type: Number, required: true },
});

module.exports = mongoose.model("Cart", cartSchema);
