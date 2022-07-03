import axios from "axios";
let headers = new Headers();

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'x-api-key': process.env.REACT_APP_X_API_KEY,
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});
const logout = (history) => {
  localStorage.clear();
  window.location = "/";
};
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("TOKEN");
    const configInterceptor = { ...config };
    if (token) {
      configInterceptor.headers.Authorization = `Bearer ${token}`;
    }
    configInterceptor.headers['x-api-key'] = process.env.REACT_APP_X_API_KEY
    return { ...configInterceptor };
  },
  (error) => {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) =>
    new Promise((resolve, reject) => {


      if (error.response.status === 401 || error.response.status === 403) {
        reject(error);
        if (error.config.url !== "/") logout();
      }
      reject(error);
    })
);
export default http;
