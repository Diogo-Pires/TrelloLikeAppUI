import axios from "axios";
import { Task } from "../domain/Task";
import { User } from "../domain/User";

const API_URL = "https://localhost:7223/";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

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
  (response) => response, // If response is OK, return it
  (error) => {
    if (error.response?.status === 401) {
      console.error("Token expired. Logging out...");
      sessionStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks/");
  return response.data;
};

export const loginUserAsync = async (userData: User) => {
  const response = await api.get(`/user/${userData.email}`);
  return response.data
};
