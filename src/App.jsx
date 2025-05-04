import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/dashboard/add" element={isLoggedIn ? <AddTransaction /> : <Navigate to="/" />} />
        <Route path="/dashboard/history" element={isLoggedIn ? <TransactionHistory /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
