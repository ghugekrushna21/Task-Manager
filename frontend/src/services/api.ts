import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_URL is not configured");
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10_000, // 10s
  withCredentials: true // Ensures cookies are sent with every request
});

api.interceptors.response.use(
  (response) => {
    console.log(
      `${response.config.method} ${response.config.url} ${response.status}`
    );

    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API error : ", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Network error :Request made but no response from backend");
    } else {
      console.error("Error : ", error.message);
    }
  }
);

export default api;
