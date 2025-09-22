const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true   
    },
    price:{
        type:Number,
        required:true
    },
    available:{
        type:Number,
        default:0
    }
},{timestamps:true})

const hotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true   
    },
    amenities:[String],
    rooms:[roomSchema]

},{timestamps:true})

module.exports=mongoose.model('Hotel',hotelSchema)