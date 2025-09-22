const Hotels=require('../models/mongo/hotelModel');

const getHotels =async(req,res)=>{
    try {
        const {location}= req.query;
        const hotels =location ? 
        await Hotels.find({location:{$regex:location,$options:'i'}}) : await Hotels.find();

        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getHotelById =async(req,res)=>{
    try {
        const hotel = await Hotels.findById(req.params.id)
        if(!hotel) return res.status(400).json({message:"Hotel not found"})
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={getHotelById,getHotels}