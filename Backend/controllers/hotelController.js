
const Hotels = require("../models/mongo/hotelModel");

//  Get hotels 
const getHotels = async (req, res) => {
  try {
    const { location } = req.query;

    let query = {};
    if (location && location.trim() !== "") {
      query.location = { $regex: location, $options: "i" };
    }

    const hotels = await Hotels.find(query);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single hotel by ID
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotels.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHotels, getHotelById };
