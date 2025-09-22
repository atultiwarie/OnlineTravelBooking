const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Hotel = require("../models/mongo/hotelModel");
const connectMongo = require("./mongo");

dotenv.config();

const hotels = [
  // Goa
  {
    name: "Ocean View Resort",
    location: "Goa",
    description: "Beautiful resort near the beach.",
    amenities: ["Pool", "WiFi", "Breakfast"],
    rooms: [
      { type: "Deluxe", price: 3000, available: 5 },
      { type: "Suite", price: 5000, available: 2 },
    ],
  },
  {
    name: "Sunset Paradise",
    location: "Goa",
    description: "Charming hotel with sunset views.",
    amenities: ["Bar", "WiFi", "Airport Shuttle"],
    rooms: [
      { type: "Standard", price: 2500, available: 6 },
      { type: "Villa", price: 4500, available: 3 },
    ],
  },

  // Manali
  {
    name: "Mountain Retreat",
    location: "Manali",
    description: "Cozy stay with mountain view.",
    amenities: ["Parking", "WiFi", "Bonfire"],
    rooms: [
      { type: "Standard", price: 2000, available: 10 },
      { type: "Cottage", price: 3500, available: 3 },
    ],
  },
  {
    name: "Snow Valley Resort",
    location: "Manali",
    description: "Stay surrounded by snow-capped peaks.",
    amenities: ["Heater", "WiFi", "Restaurant"],
    rooms: [
      { type: "Deluxe", price: 2800, available: 7 },
      { type: "Family Suite", price: 4200, available: 2 },
    ],
  },

  // Delhi
  {
    name: "Taj Palace",
    location: "Delhi",
    description: "Luxury stay in heart of Delhi.",
    amenities: ["Spa", "Gym", "WiFi"],
    rooms: [
      { type: "Luxury", price: 6000, available: 5 },
      { type: "Premium", price: 4500, available: 8 },
    ],
  },
  {
    name: "The Leela",
    location: "Delhi",
    description: "Elegant stay with modern luxury.",
    amenities: ["Pool", "WiFi", "Conference Hall"],
    rooms: [
      { type: "Executive", price: 5500, available: 6 },
      { type: "Presidential Suite", price: 9000, available: 1 },
    ],
  },

  // Jaipur
  {
    name: "Pink City Heritage",
    location: "Jaipur",
    description: "Traditional haveli experience.",
    amenities: ["Cultural Shows", "WiFi", "Breakfast"],
    rooms: [
      { type: "Heritage", price: 3000, available: 4 },
      { type: "Royal Suite", price: 5000, available: 2 },
    ],
  },
  {
    name: "Amber Fort View Hotel",
    location: "Jaipur",
    description: "Stay close to the famous Amber Fort.",
    amenities: ["Terrace", "WiFi", "Parking"],
    rooms: [
      { type: "Standard", price: 2200, available: 6 },
      { type: "Deluxe", price: 3500, available: 3 },
    ],
  },

  // Mumbai
  {
    name: "Sea Breeze Hotel",
    location: "Mumbai",
    description: "Relaxing stay near Marine Drive.",
    amenities: ["Sea View", "WiFi", "Pool"],
    rooms: [
      { type: "Standard", price: 3200, available: 5 },
      { type: "Luxury", price: 5500, available: 3 },
    ],
  },
  {
    name: "City Lights Inn",
    location: "Mumbai",
    description: "Business-friendly stay in the city center.",
    amenities: ["Gym", "WiFi", "Airport Pickup"],
    rooms: [
      { type: "Executive", price: 4000, available: 6 },
      { type: "Suite", price: 7000, available: 2 },
    ],
  },
];

const seedHotels = async () => {
  await connectMongo();
  await Hotel.deleteMany();
  await Hotel.insertMany(hotels);
  process.exit();
};

seedHotels();
