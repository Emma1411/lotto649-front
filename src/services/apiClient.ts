import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_URL } from "../utils/constants";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface APIRequestProps {
  url: string;
  requestMethod?: HttpMethod;
  requestBody?: any;
  params?: Record<string, any>;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// response interceptor (important)
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

// generic request
export const APIRequest = async ({
  url,
  requestMethod = "GET",
  requestBody,
  params,
}: APIRequestProps) => {
  const config: AxiosRequestConfig = {
    url,
    method: requestMethod,
    data: requestBody,
    params,
  };

  return apiClient.request(config);
};

export default apiClient;