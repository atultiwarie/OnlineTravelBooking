const Cart = require("../models/mongo/cartModel");
const Hotel = require("../models/mongo/hotelModel");

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { hotelId, roomType, quantity, checkin, checkout, guests } =
        req.body;
      const existing = await Cart.findOne({
        userId: req.user.id,
        hotelId,
        roomType,
        checkin,
        checkout,
      });
      if (existing) {
        existing.quantity += quantity;
        existing.guests = guests;
        await existing.save();
        res.status(200).json(existing);
      }

      const cartItem = await Cart.create({
        userId: req.user.id,
        hotelId,
        roomType,
        quantity,
        checkin,
        checkout,
        guests,
      });

      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { cartId } = req.params;
      await Cart.findByIdAndDelete(cartId);
      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getCart: async (req, res) => {
    try {
      const cartItems = await Cart.find({ userId: req.user.id }).populate(
        "hotelId"
      );
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = cartController;
