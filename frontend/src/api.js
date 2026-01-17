import axios from "axios";

const API = axios.create({
  baseURL: "https://personal-expense-tracker-backend-xp5p.onrender.com",
});

// token auto attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
