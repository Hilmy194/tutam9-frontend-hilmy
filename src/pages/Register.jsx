import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api";

function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registrasi berhasil! Silakan login.");
      navigate("/");
    } catch (err) {
      alert("Gagal registrasi: " + err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border mb-4"
          required
        />
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">Register</button>
        <p className="mt-4 text-sm text-center">Sudah punya akun? <Link to="/" className="text-purple-600">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;
