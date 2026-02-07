import axios from "axios";

// Resolve API base URL in order of precedence:
// 1) Vite build-time env VITE_API_BASE_URL
// 2) runtime global window.__API_BASE_URL__ (useful for runtime overrides)
// 3) localhost during local development
// 4) empty string -> axios will use relative URLs (same origin)
const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  window.__API_BASE_URL__ ||
  (location.hostname === "localhost" || location.hostname === "127.0.0.1" ? "http://localhost:4000" : "");

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
