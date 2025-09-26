import React from "react";
import { Link } from "react-router-dom";

export default function HotelCard({ hotel }) {
  return (
    <div className="border rounded p-4">
      <h2 className="font-bold">{hotel.name}</h2>
      <p>{hotel.location}</p>
      <Link
        to={`/hotels/${hotel._id}`}
        className="mt-2 inline-block px-3 py-1 bg-blue-500 text-white rounded"
      >
        View Details
      </Link>
    </div>
  );
}
