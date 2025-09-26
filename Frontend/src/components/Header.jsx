import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          Mini OTA
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="hover:underline">
            Search
          </Link>
          <Link to="/cart" className="hover:underline">
            Cart
          </Link>

          {!user && (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded bg-blue-500 text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded bg-green-500 text-white"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <span className="font-medium">Hello, {user.name}</span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-3 py-1 rounded bg-red-500 text-white"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
