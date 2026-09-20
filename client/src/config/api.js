import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("neetvidya_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const refreshToken = localStorage.getItem("neetvidya_refresh");
      if (refreshToken) {
        try {
          const { data } = await api.post("/auth/refresh", { refreshToken });
          localStorage.setItem("neetvidya_token", data.data.accessToken);
          error.config.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return api(error.config);
        } catch {
          localStorage.removeItem("neetvidya_token");
          localStorage.removeItem("neetvidya_refresh");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
