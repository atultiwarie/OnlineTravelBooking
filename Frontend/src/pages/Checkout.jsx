import React, { useEffect, useState } from "react";
import { checkoutBooking, getCart } from "../api/api";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const loadCart = async () => {
    try {
      const res = await getCart();
      const cartItems = res.data || [];
      setCart(cartItems);

      let total = 0;
      cartItems.forEach((item) => {
        const pricePerRoom =
          item.hotelId.rooms.find((r) => r.type === item.roomType)?.price || 0;
        total += pricePerRoom * item.quantity;
      });
      setTotalCost(total);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleCheckout = async () => {
    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const res = await checkoutBooking();
      alert(`Booking successful! Total Cost: ₹${res.data.totalCost}`);
      setCart([]);
      setTotalCost(0);
    } catch (err) {
      console.error("Checkout error:", err);
      alert(err.response?.data?.error || "Checkout failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded flex justify-between"
            >
              <div>
                <p>Hotel: {item.hotelId.name}</p>
                <p>Room: {item.roomType}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Check-In: {new Date(item.checkin).toLocaleDateString()}</p>
                <p>Check-Out: {new Date(item.checkout).toLocaleDateString()}</p>
              </div>
              <p>
                ₹
                {item.hotelId.rooms.find((r) => r.type === item.roomType)
                  ?.price * item.quantity || 0}
              </p>
            </div>
          ))}
          <p className="font-bold text-xl mt-4">Total: ₹{totalCost}</p>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {loading ? "Processing..." : "Confirm & Pay"}
          </button>
        </div>
      )}
    </div>
  );
}
