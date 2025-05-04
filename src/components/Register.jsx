import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://tutam9-backend-hilmy-production.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/");
      } else {
        const error = await response.json();
        alert(error.message || "Registrasi gagal.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
        <p className="text-center mt-4">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 cursor-pointer underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;