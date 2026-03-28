import axios from "axios";


const BASE_URL = "https://ai-job-preparation-web-app.onrender.com/api";
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.timeout = 60000;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;