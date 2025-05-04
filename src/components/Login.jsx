import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(form);
      localStorage.setItem("token", response.data.token); // Simpan token di localStorage
      onLogin();
      navigate("/dashboard"); // Arahkan ke halaman dashboard
    } catch (err) {
      console.error("Login failed:", err.message);
      alert("Login gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          Login
        </button>
        <p className="text-center mt-4">
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;