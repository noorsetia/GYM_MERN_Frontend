import axios from "axios";

// Determine base URL using multiple common environment patterns so this
// code works with Vite (VITE_API_BASE_URL) and CRA (REACT_APP_API_BASE_URL),
// supports a runtime override via window.__API_BASE_URL__, and falls back to
// localhost for development only.
const viteUrl = typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_API_BASE_URL : undefined;
const craUrl = typeof process !== "undefined" ? process.env.REACT_APP_API_BASE_URL : undefined;
const runtimeUrl = typeof window !== "undefined" ? window.__API_BASE_URL__ : undefined;

const isLocal = typeof location !== "undefined" && (location.hostname === "localhost" || location.hostname === "127.0.0.1");

const baseURL = viteUrl || craUrl || runtimeUrl || (isLocal ? "http://localhost:4000" : "");

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

// Optional: log baseURL in development to make debugging easier
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line no-console
  console.log("API baseURL:", baseURL || "<relative>");
}

export default apiClient;
