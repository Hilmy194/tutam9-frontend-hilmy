import axios from "axios";

const API_URL = "https://tutam9-backend-hilmy-production.up.railway.app/";

export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
export const register = (data) => axios.post(`${API_URL}/user/register`, data);
export const fetchTransactions = () =>
  axios.get(`${API_URL}/api/transactions`); // Hapus header Authorization

export const addTransaction = async (form) => {
  const response = await fetch(`${API_URL}/api/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error("Failed to add transaction");
  }

  return await response.json();
};
