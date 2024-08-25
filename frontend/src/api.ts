import axios, { type AxiosInstance } from "axios";

const jsonApiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5252/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const formApiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5252/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const getToken = () => localStorage.getItem("authToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const setAuthHeader = (axiosInstance: AxiosInstance) => {
  const token = getToken();
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

jsonApiClient.interceptors.request.use(
  (config) => {
    setAuthHeader(jsonApiClient);
    return config;
  },
  (error) => Promise.reject(error)
);

jsonApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await jsonApiClient.post(`/refresh-token`, {
            refreshToken,
          });
          const { token, refreshToken: newRefreshToken } = response.data;

          localStorage.setItem("authToken", token);
          localStorage.setItem("refreshToken", newRefreshToken);

          setAuthHeader(jsonApiClient);

          return jsonApiClient(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

formApiClient.interceptors.request.use(
  (config) => {
    setAuthHeader(formApiClient);
    return config;
  },
  (error) => Promise.reject(error)
);

formApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await formApiClient.post(`/refresh-token`, {
            refreshToken,
          });
          const { token, refreshToken: newRefreshToken } = response.data;

          localStorage.setItem("authToken", token);
          localStorage.setItem("refreshToken", newRefreshToken);

          setAuthHeader(formApiClient);

          return formApiClient(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export { jsonApiClient, formApiClient };
