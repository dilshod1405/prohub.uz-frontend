import axios from "axios";
import { getCSRFToken } from "./csrf_utils";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true, // Include cookies in requests
});

// Attach CSRF token to request headers
API.interceptors.request.use((config) => {
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

export default API;
