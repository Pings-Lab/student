import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1", // your backend
  withCredentials: true, // send HttpOnly JWT cookies
});

export default axiosClient;
