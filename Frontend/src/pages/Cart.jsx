import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api/api";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await getCart();
      setCart(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      loadCart();
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  Hotel: {item.hotelId?.name || "Unknown"}
                </p>
                <p>Room: {item.roomType}</p>
                <p>Guests: {item.guests}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Check-In: {new Date(item.checkin).toLocaleDateString()}</p>
                <p>Check-Out: {new Date(item.checkout).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <Link
            to="/checkout"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
