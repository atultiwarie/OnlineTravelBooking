import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHotelById, addToCart } from "../api/api";

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roomSelection, setRoomSelection] = useState({}); 

  useEffect(() => {
    const loadHotel = async () => {
      setLoading(true);
      try {
        const res = await fetchHotelById(id);
        setHotel(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadHotel();
  }, [id]);

  const handleRoomChange = (roomType, value) => {
    setRoomSelection((prev) => ({
      ...prev,
      [roomType]: parseInt(value) || 0,
    }));
  };

  const handleAddToCart = async (room) => {
    const quantity = roomSelection[room.type] || 1;
    const searchData = JSON.parse(localStorage.getItem("searchData"));

    try {
      await addToCart({
        hotelId: hotel._id,
        roomType: room.type,
        quantity,
        checkin: searchData.checkin,
        checkout: searchData.checkout,
        guests: searchData.guests,
        price: room.price,
      });
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!hotel) return <p>Hotel not found</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{hotel.name}</h1>
      <p>{hotel.description}</p>

      <h2 className="text-lg font-bold mt-4">Rooms</h2>
      {hotel.rooms.map((room) => (
        <div key={room._id} className="border p-2 mb-2">
          <p>Type: {room.type}</p>
          <p>Price per room: ${room.price}</p>
          <div className="flex items-center mt-2 gap-2">
            <label>Number of rooms:</label>
            <input
              type="number"
              min="1"
              value={roomSelection[room.type] || 1}
              onChange={(e) => handleRoomChange(room.type, e.target.value)}
              className="border p-1 w-16 rounded"
            />
          </div>
          <button
            onClick={() => handleAddToCart(room)}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
