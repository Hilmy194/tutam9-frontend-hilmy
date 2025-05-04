import axios from "axios";

const API_URL = "https://tutam9-backend-hilmy-production.up.railway.app/";

export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
export const register = (data) => axios.post(`${API_URL}/user/register`, data);
export const fetchTransactions = (token) =>
  axios.get("https://tutam9-backend-hilmy-production.up.railway.app//api/transactions", {
    headers: { Authorization: `Bearer ${token}` }, // Kirim token di header Authorization
  });

export const addTransaction = async (form, token) => {
  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Kirim token di header Authorization
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error("Failed to add transaction");
  }

  return await response.json();
};
