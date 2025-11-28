import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://gym-backend-one-swart.vercel.app/", // ✅ Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
