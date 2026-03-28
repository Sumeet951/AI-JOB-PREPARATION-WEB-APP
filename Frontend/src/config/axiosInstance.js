import axios from "axios";


const BASE_URL = "http://localhost:8080/api";
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.timeout = 60000;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;