import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { type IServerResponseSimple, LoginResponse } from "./types";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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

const getToken = () => sessionStorage.getItem("authToken");
const getRefreshToken = () => sessionStorage.getItem("refreshToken");

jsonApiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

jsonApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await jsonApiClient.post<
            IServerResponseSimple<LoginResponse>
          >(`/user/refresh-token`, {
            refreshToken,
          });
          const { token, refreshToken: newRefreshToken } = response.data.item;

          sessionStorage.setItem("authToken", token);
          sessionStorage.setItem("refreshToken", newRefreshToken);

          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
          }

          return jsonApiClient(originalRequest);
        } catch (refreshError) {
          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("refreshToken");
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

formApiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

formApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await formApiClient.post(`/user/refresh-token`, {
            refreshToken,
          });
          const { token, refreshToken: newRefreshToken } = response.data;

          sessionStorage.setItem("authToken", token);
          sessionStorage.setItem("refreshToken", newRefreshToken);

          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
          }

          return formApiClient(originalRequest);
        } catch (refreshError) {
          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("refreshToken");
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export { jsonApiClient, formApiClient };
