import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard/add" element={<AddTransaction />} />
        <Route path="/dashboard/history" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
