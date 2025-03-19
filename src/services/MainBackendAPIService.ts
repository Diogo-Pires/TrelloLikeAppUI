import axios, { AxiosError } from "axios";
import { UpdateTask } from "../domain/UpdateTask";
import { startLoading, stopLoading } from "../LoadingBar";
import { appCallMaxNumberOfRetries, ExponentialBackoff } from "../shared/RetryPolicyFunctions";
import { Task } from "../domain/Task";
import { APIErrorResponse } from "../shared/APIErrorResponse";
import { dispatch, getState } from "../stores/store";
import { logout } from "../stores/authSlice";

const API_URL = "https://localhost:7223/";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    startLoading();

    const state = getState();
    const user = state.auth.user; 
    const token = state.auth.token; 

    if (!user || !token) {
      dispatch(logout());
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.signal = new AbortController().signal;
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
      dispatch(logout());
    }

    const axiosError = error as AxiosError<APIErrorResponse>;
    if (axiosError.response?.status === 400 && axiosError.response.data?.errors) {
      console.error("Validation Error:", axiosError.response.data.errors);
      return Promise.reject(axiosError.response.data);
    }

    return Promise.reject(error);
  }
);

export const fetchUserTasks = async (email: string | undefined): Promise<Task[]> => {
  if(!email)
    dispatch(logout());

  const response = await api.get(`/tasks/assignedTo/${email}`);
  return response.data;
};

export const fetchTaskDetails = async (id: string): Promise<UpdateTask> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const updateTaskDetails = async (task: UpdateTask): Promise<UpdateTask> => {
  const response = await api.put(`/tasks`, JSON.stringify(task));
  return response.data;
};