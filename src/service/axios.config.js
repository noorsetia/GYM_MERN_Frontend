import axios from "axios";

// Use Vite environment variable when available. During development this will
// fall back to localhost:4000 so `npm run dev` + local backend work seamlessly.
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
