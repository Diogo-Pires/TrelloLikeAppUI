import axios from "axios";
import { Task } from "../domain/Task";
import { SessionManagementService } from "./SessionManagementService";
import { startLoading, stopLoading } from "../LoadingBar";

const API_URL = "https://localhost:7223/";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    startLoading();
    const token = SessionManagementService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    stopLoading();
    return response;
  },
  (error) => {
    stopLoading();
    if (error.response?.status === 401) {
      SessionManagementService.logout();
    }
    return Promise.reject(error);
  }
);

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks/");
  return response.data;
};