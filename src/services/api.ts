import axios from "axios";

const API_URL = "YOUR_TRELLO_API_URL";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Example function to fetch boards
export const fetchBoards = async () => {
  const response = await api.get("/boards");
  return response.data;
};
