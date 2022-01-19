import axios from "axios";
let headers = new Headers();

console.log(headers);
const http = axios.create({
  baseURL: "https://ll261boi04.execute-api.sa-east-1.amazonaws.com/dev/",
  headers: {
    'Authorization': 'Basic '+Buffer.from('sk_test_Z58AQoXcghQe91kb:').toString('base64'),
    'Content-Type': 'application/json', 
    'Accept':'*/*',

  },
});
export default http;