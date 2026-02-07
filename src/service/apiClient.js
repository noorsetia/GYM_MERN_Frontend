import apiClient from "./axios.config";

function makeNetworkError(original) {
  const err = new Error("Network error: could not reach server.");
  err.code = "NETWORK_ERROR";
  err.original = original;
  return err;
}

function normalizeError(e) {
  // Axios network errors often have no response
  if (!e || !e.response) throw makeNetworkError(e);
  const message = e.response?.data?.message || e.message || "Request failed";
  const err = new Error(message);
  err.status = e.response?.status;
  err.original = e;
  throw err;
}

export async function post(url, data, opts) {
  try {
    const res = await apiClient.post(url, data, opts);
    return res.data;
  } catch (e) {
    normalizeError(e);
  }
}

export async function get(url, opts) {
  try {
    const res = await apiClient.get(url, opts);
    return res.data;
  } catch (e) {
    normalizeError(e);
  }
}

export default { post, get };
