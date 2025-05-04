import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null); // Data transaksi yang sedang diedit

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://tutam9-backend-hilmy-production.up.railway.app/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err.message);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://tutam9-backend-hilmy-production.up.railway.app/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      alert("Transaction deleted successfully!");
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting transaction:", err.message);
    }
  };

  const openEditModal = (transaction) => {
    setCurrentTransaction(transaction); // Set data transaksi yang akan diedit
    setIsModalOpen(true); // Tampilkan modal
  };

  const closeEditModal = () => {
    setIsModalOpen(false); // Sembunyikan modal
    setCurrentTransaction(null); // Reset data transaksi
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://tutam9-backend-hilmy-production.up.railway.app/api/transactions/${currentTransaction._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentTransaction),
      });
      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }
      const updatedTransaction = await response.json();
      setTransactions(
        transactions.map((t) => (t._id === updatedTransaction._id ? updatedTransaction : t))
      );
      alert("Transaction updated successfully!");
      closeEditModal(); // Tutup modal setelah berhasil
    } catch (err) {
      console.error("Error updating transaction:", err.message);
      alert("Failed to update transaction");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTransaction({ ...currentTransaction, [name]: value });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <ul className="bg-white rounded shadow p-4">
          {transactions.map((t) => (
            <li key={t._id} className="border-b py-2 flex justify-between items-center">
              <div>
                <strong>{t.type.toUpperCase()}</strong>: ${t.amount} - {t.description}
                <div className="text-sm text-gray-500">
                  {new Date(t.date).toLocaleDateString()} {/* Format tanggal */}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(t)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal untuk Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Type</label>
                <select
                  name="type"
                  value={currentTransaction.type}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={currentTransaction.amount}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={currentTransaction.description}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;