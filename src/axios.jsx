import Axios from "axios";

const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Add an interceptor to log requests
api.interceptors.request.use((request) => {
  console.log("Starting Request:", request.url);
  return request;
});

export default api;
