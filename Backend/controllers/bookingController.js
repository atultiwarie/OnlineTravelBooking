const Booking = require('../models/postgres/bookingModel');
const Cart = require('../models/mongo/cartModel');

const createBooking = async (req, res) => {
    try {
        const{userId}=req.body
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }
         const bookings = [];
         for (const item of cart.items) {
           const booking = await Booking.create({
             userId,
             hotelId: item.hotelId,
             roomId: item.roomId,
             checkIn: item.checkIn,
             checkOut: item.checkOut,
             guests: item.guests,
             price: item.price,
             status: "pending", 
           });
           bookings.push(booking);
         }
           cart.items = [];
           await cart.save();

           res.status(201).json({ message: "Booking created", bookings });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createBooking };