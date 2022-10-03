import axios from "axios";

const http = axios.create({
  baseURL: 'http://api.fontereiki.com.br:8080',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFBnIjoiY3VzX3ZRNUQza0VJMHRNRURnT24iLCJuYW1lIjoiVGVzdGUnIiwibGFzdE5hbWUiOiJNYXLDp28iLCJlbWFpbCI6Imh1Z28uZGFudGFzQGdtYWlsLmNvbSIsImJpcnRoRGF0ZSI6IjE5OTItMDYtMTEiLCJkb2N1bWVudCI6IjQ3MDUyNDMxMDI1IiwibW9iaWxlUGhvbmUiOiIxMTkxMjM0NTY3OCIsIl9pZCI6Ijg1OTEwYjllLWYxZjMtNGVkOC1iZGIwLTA3ZGZlNjhmNzE1OCIsImNyZWF0ZWRBdCI6IjIwMjItMTAtMDNUMTY6Mzc6MzguMjYwWiIsInVwZGF0ZWRBdCI6IjIwMjItMTAtMDNUMTY6Mzc6MzguMjYwWiIsImFjdGl2ZSI6dHJ1ZSwiaWF0IjoxNjY0ODE1MDU4fQ.2xnCdoiQ3G10A2xIeHoQqUjUDK63tEZP4GQX3dxNcNc',
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
