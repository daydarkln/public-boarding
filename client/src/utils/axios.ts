import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

/**
 * Core axios instance
 * */
const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
}) as AxiosInstance & {
  formData: AxiosInstance;
  download: AxiosInstance;
};

/**
 * Core axios instance
 * */
export const axiosInstanceForProxy = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
}) as AxiosInstance & {
  formData: AxiosInstance;
  download: AxiosInstance;
};

/**
 * Axios with form data interceptors
 *
 * Converts any data to form data
 * */
const axiosFormDataInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "multipart/form-data",
    TimeZone: new Date().getTimezoneOffset() / -60,
  },
});

/**
 * Axios with download interceptors
 *
 * Response is array buffer
 * */
const axiosDownloadInstance = axios.create({
  baseURL: "/api",
  responseType: "arraybuffer",
  headers: {
    TimeZone: new Date().getTimezoneOffset() / -60,
  },
});

/**
 * Axios request interceptor to set csrf and authorization tokens
 * */
function requestInterceptor(request: InternalAxiosRequestConfig) {
  const authorization = localStorage.getItem("authorization");
  if (request.headers && authorization) {
    request.headers.Authorization = `Bearer ${authorization}`;
  }

  return request;
}

/**
 * Axios response interceptor to get csrf and authorization tokens
 * */
function responseInterceptor(response: AxiosResponse) {
  if (!response) return response;

  const token = response.data.jwt;

  if (token) {
    localStorage.setItem("authorization", token);
  }

  return response;
}

/**
 * Axios request interceptor to transform data to form data
 * */
const formDataRequestInterceptor = (request: InternalAxiosRequestConfig) => {
  return request;
};

/**
 * Axios response error interceptor to decode array buffer
 * */
const downloadResponseErrorInterceptor = (result: {
  response: AxiosResponse;
}) => {
  const { data } = result.response;

  const decoder = new TextDecoder();
  const encodedString = decoder.decode(data);
  const json = JSON.parse(encodedString);
  throw { ...result, response: { ...result.response, data: json } };
};

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor);

axiosFormDataInstance.interceptors.request.use(requestInterceptor);
axiosFormDataInstance.interceptors.request.use(formDataRequestInterceptor);
axiosFormDataInstance.interceptors.response.use(responseInterceptor);

axiosDownloadInstance.interceptors.request.use(requestInterceptor);
axiosDownloadInstance.interceptors.response.use(
  responseInterceptor,
  downloadResponseErrorInterceptor,
);

axiosInstance.formData = axiosFormDataInstance;
axiosInstance.download = axiosDownloadInstance;

export default axiosInstance;
