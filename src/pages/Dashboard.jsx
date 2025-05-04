import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

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

        // Hitung total income, expense, dan balance
        const income = data
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);
        const expense = data
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);
        setTotalIncome(income);
        setTotalExpense(expense);
        setBalance(income - expense);
      } catch (err) {
        console.error("Error fetching transactions:", err.message);
      }
    };

    fetchTransactions();
  }, []);

  const getBalanceColor = () => {
    if (balance > 0) return "text-green-500";
    if (balance < 0) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Your Balance</h1>
        <p className={`text-4xl font-bold ${getBalanceColor()}`}>${balance.toFixed(2)}</p>
        <div className="flex justify-between mt-4">
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-600">Income</h2>
            <p className="text-xl font-bold text-green-500">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-600">Expense</h2>
            <p className="text-xl font-bold text-red-500">${totalExpense.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-grow justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <div
            onClick={() => navigate("/dashboard/add")}
            className="cursor-pointer p-8 rounded shadow-md flex justify-center items-center bg-green-500 hover:bg-green-600"
          >
            <h2 className="text-xl font-bold text-center text-white">Add Transaction</h2>
          </div>

          <div
            onClick={() => navigate("/dashboard/history")}
            className="cursor-pointer p-8 rounded shadow-md flex justify-center items-center bg-gray-500 hover:bg-gray-600"
          >
            <h2 className="text-xl font-bold text-center text-white">History</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
