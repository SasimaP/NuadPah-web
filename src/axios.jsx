import Axios from "axios";

const api = Axios.create({
  baseURL: "https://senuadpahdocker-production.up.railway.app",
  withCredentials: true,
});

// Add an interceptor to log requests
api.interceptors.request.use((request) => {
  console.log("Starting Request:", request.url);
  return request;
});

export default api;
