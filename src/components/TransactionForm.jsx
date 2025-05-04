import React, { useState } from "react";

function TransactionForm({ onSuccess }) {
  const [form, setForm] = useState({ type: "income", amount: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://tutam9-backend-hilmy-production.up.railway.app/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }
      const data = await response.json();
      alert("Transaction added successfully!");
      setForm({ type: "income", amount: "", description: "" }); // Reset form
      onSuccess(); // Callback untuk memperbarui data
    } catch (err) {
      console.error("Error adding transaction:", err.message);
      alert("Failed to add transaction");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Transaction</h2>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded w-full hover:bg-blue-600 transition duration-200"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
