import { logoutUser } from "../redux/slices/userSlice";
import { store } from "../redux/store";
import axios, { AxiosRequestConfig } from "axios";

export const authAPI = axios.create({
  baseURL: import.meta.env.VITE_PHEME_ENDPOINT_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    mode: "cors",
  },
});

export const baseAPI = axios.create({
  baseURL: import.meta.env.VITE_PHEME_ENDPOINT_URL,
  headers: {
    'Authorization': "JWT_TOKEN",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    mode: "cors",
  },
  withCredentials: true
});

baseAPI.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = store.getState().user.currentUser.accessToken;
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => { }
);

baseAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      store.dispatch(logoutUser());
    }
  }
);
