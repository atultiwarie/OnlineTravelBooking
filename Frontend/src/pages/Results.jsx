import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchHotels } from "../api/api";
import Loader from "../components/Loader";

export default function Results() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      try {
        const params = { location: searchParams.get("location") };
        const res = await fetchHotels(params);
        setHotels(res.data);
      } catch (err) {
        console.error("Error fetching hotels", err);
      } finally {
        setLoading(false);
      }
    };
    loadHotels();
  }, [searchParams]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {loading ? (
        <Loader />
      ) : hotels.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="border p-4 rounded cursor-pointer hover:shadow-lg"
              onClick={() => navigate(`/hotels/${hotel._id}`)}
            >
              <h2 className="font-bold text-lg">{hotel.name}</h2>
              <p>{hotel.location}</p>
              <p>{hotel.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  );
}
