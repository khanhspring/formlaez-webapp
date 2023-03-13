import axios from "axios";
import { toast } from "react-toastify";
import TokenStorageService from "../services/token-storage-service";

const RestClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

RestClient.interceptors.request.use(
  function (config) {
    const token = TokenStorageService.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = "Bearer " + TokenStorageService.getToken();
    }
    config.baseURL = process.env.REACT_APP_API_BASE_URL + "/";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

RestClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      TokenStorageService.removeToken();
      window.location.href = process.env.REACT_APP_AUTH_LOGOUT_URL || '/errors/401';
      return;
    }
    if (error.response?.status === 403) {
      toast.error("You have no permission to perform this action!");
    }

    return Promise.reject(error);
  }
);

export default RestClient;