import React from "react";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";

function AddTransaction() {
  const handleSuccess = () => {
    
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow p-6">
        <TransactionForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export default AddTransaction;