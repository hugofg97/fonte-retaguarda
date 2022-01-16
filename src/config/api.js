import axios from "axios";
let headers = new Headers();

console.log(headers);
const http = axios.create({
  baseURL: "http://localhost:3000/dev/",
  headers: {
    'Authorization': 'Basic '+Buffer.from('sk_test_Z58AQoXcghQe91kb:').toString('base64'),
    'Content-Type': 'application/json', 
    'Origin':'http://10.0.0.105:3000',
    'Accept':'*/*',
    'User-Agent':'PostmanRuntime/7.28.4'

  },
});
export default http;