import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchData = { destination, checkin, checkout, guests };
    localStorage.setItem("searchData", JSON.stringify(searchData));
    navigate(`/results?location=${destination}`);
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Search Hotels</h1>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 rounded w-full mb-2"
        value={checkin}
        onChange={(e) => setCheckin(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 rounded w-full mb-2"
        value={checkout}
        onChange={(e) => setCheckout(e.target.value)}
      />
      <input
        type="number"
        min="1"
        className="border p-2 rounded w-full mb-2"
        value={guests}
        placeholder="Number of Guests"
        onChange={(e) => setGuests(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
}
