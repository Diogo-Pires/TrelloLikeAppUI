import axios from "axios";

const API_URL = "http://localhost:7291/api/";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const fetchTasks = async () => {
  const response = await api.get("/tasks/");
  return response.data;
};
