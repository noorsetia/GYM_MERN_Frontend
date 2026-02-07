import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://gym-backend-1-z4zg.onrender.com", // ✅ Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
