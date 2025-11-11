const API_URL = "https://seu-backend.onrender.com/api";

export const api = {
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
  getLessons: async (token) => {
    const res = await fetch(`${API_URL}/lessons`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};
