const Booking = require("../models/postgres/bookingModel");
const Cart = require("../models/mongo/cartModel");

const createBooking = async (req, res) => {
  try {
    const userId = req.user.id; 
    const cart = await Cart.find({ userId }).populate("hotelId");
    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    let totalCost = 0;
    const bookings = [];

    for (const item of cart) {
     
      const room = item.hotelId.rooms.find((r) => r.type === item.roomType);
      const pricePerRoom = room ? room.price : 0;
      const itemTotal = pricePerRoom * item.quantity;
      totalCost += itemTotal;

      const booking = await Booking.create({
        userId,
        hotelId: item.hotelId._id,
        roomId: room?._id || null,
        checkIn: item.checkin,
        checkOut: item.checkout,
        guests: item.guests,
        price: itemTotal,
        status: "pending",
      });
      bookings.push(booking);
    }

    // Clear cart after booking
    await Cart.deleteMany({ userId });

    res.status(201).json({ message: "Booking created", bookings, totalCost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createBooking };
