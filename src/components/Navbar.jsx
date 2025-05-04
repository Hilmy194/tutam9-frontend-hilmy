import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    navigate("/"); // Arahkan ke halaman login
  };

  return (
    <div
      className="flex justify-between items-center text-white p-4 shadow-md"
      style={{
        backgroundColor: "#1a1a1a", // Warna gelap
      }}
    >
      <h1 className="text-xl font-bold">Finance Tracker</h1>
      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className="px-4 py-2 rounded hover:bg-gray-700 text-white"
          style={{
            backgroundColor: "#333333",
          }}
        >
          Home
        </Link>
        <Link
          to="/dashboard/add"
          className="px-4 py-2 rounded hover:bg-gray-700 text-white"
          style={{
            backgroundColor: "#333333",
          }}
        >
          Add Transaction
        </Link>
        <Link
          to="/dashboard/history"
          className="px-4 py-2 rounded hover:bg-gray-700 text-white"
          style={{
            backgroundColor: "#333333",
          }}
        >
          History
        </Link>
        <button
          onClick={logout}
          className="px-4 py-2 rounded hover:bg-red-700 text-white"
          style={{
            backgroundColor: "#b71c1c", // Warna merah gelap untuk tombol logout
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;