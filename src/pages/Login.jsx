import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login gagal: " + err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
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
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">Login</button>
        <p className="mt-4 text-sm text-center">Belum punya akun? <Link to="/register" className="text-purple-600">Register</Link></p>
      </form>
    </div>
  );
}

export default Login;
