import axios from "axios";
let headers = new Headers();

console.log(headers);
const http = axios.create({
  baseURL: "https://mf3vja7363.execute-api.sa-east-1.amazonaws.com/dev/",
  headers: {
    'Authorization': 'Basic '+Buffer.from('sk_test_Z58AQoXcghQe91kb:').toString('base64'),
    'Content-Type': 'application/json', 
    'Accept':'*/*',

  },
});
const logout = (history) => {
  localStorage.clear();
  window.location = '/login';
};
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("TOKEN");;
    const configInterceptor = { ...config };
    if (token) {
      configInterceptor.headers.Authorization = `Bearer ${token}`;
    }
    return { ...configInterceptor };
  },
  (error) => {
    return Promise.reject(error);
  },
);
http.interceptors.response.use(
  (response) => {
    console.log("________________________________");
    return response;
  },
  (error) =>
    new Promise((resolve, reject) => {
    console.log("________________________________");

      console.log(error.response.data.message)
      if (error.response.status === 401 || error.response.status === 403) {
       
        reject(error);
          if (error.config.url !== '/login') logout();
        
      }
      reject(error)
      
    }),
);
export default http;