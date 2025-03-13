import axios, { AxiosInstance } from "axios";
import { Task } from "../domain/Task";
import { SessionManagementService } from "./SessionManagementService";
import { startLoading, stopLoading } from "../LoadingBar";
import { toast } from "react-toastify";
import { appCallMaxNumberOfRetries, ExponentialBackoff } from "../shared/retryPolicyFunctions";
import { User } from "../domain/User";

const API_URL = "https://localhost:7223/";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    startLoading();
      
    const user = SessionManagementService.getAuhenticateUser();
    if(!user) {
      DealWithNoAuthenticateUser();
    }

    const token = SessionManagementService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }

    return config;
  },
  (error) => {
    error.retryDelay = ExponentialBackoff;

    const { config, response } = error;
    const MAX_RETRIES = appCallMaxNumberOfRetries;

    if (!config.__retryCount) {
      config.__retryCount = 0;
    }

    if (response?.status >= 500 && config.__retryCount < MAX_RETRIES) {
      config.__retryCount += 1;
      return api(config);
    }

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

export const fetchUserTasks = async (): Promise<Task[]> => {
  const user = SessionManagementService.getAuhenticateUser();
  if(!user){
    DealWithNoAuthenticateUser();
  }

  const response = await api.get(`/tasks/assignedTo/${user?.email}`);
  return response.data;
};

export const fetchTaskDetails = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

const DealWithNoAuthenticateUser = (): Promise<any> =>{
  var msg = 'User not logged in';
  toast.error(msg);
  SessionManagementService.logout();
  return Promise.reject(msg);
}