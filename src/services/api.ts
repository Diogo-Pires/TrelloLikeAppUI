import axios from "axios";
import { Task } from "../domain/task";
import { User } from "../domain/user";

const API_URL = "http://localhost:7291/api/";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks/");
  return response.data;
};

export const loginUserAsync = async (userData: User) => {
  const response = await api.get(`/user/${userData.email}`);
  return response.data
};
