import React, { useEffect, useState } from "react";

function History() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://tutam9-backend-hilmy-production.up.railway.app/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <li key={transaction._id} className="border p-4 rounded shadow">
            <p><strong>Type:</strong> {transaction.type}</p>
            <p><strong>Amount:</strong> {transaction.amount}</p>
            <p><strong>Description:</strong> {transaction.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;