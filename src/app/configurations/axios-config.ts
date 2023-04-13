import axios from "axios";
import { redirect } from "react-router-dom";
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
      config.headers["Authorization"] =
        "Bearer " + TokenStorageService.getToken();
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
    const params = error.config.params || {};
    const ignore401 = params.ignore401 || false;
    const ignore403 = params.ignore403 || false;

    if (error.response?.status === 401 && !ignore401) {
      TokenStorageService.removeToken();
      redirect("/errors/401");
      return;
    }
    if (error.response?.status === 403 && !ignore403) {
      toast.error("You have no permission to perform this action!");
    }

    return Promise.reject(error);
  }
);

export default RestClient;
