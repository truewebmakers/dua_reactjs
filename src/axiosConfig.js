import axios from 'axios';
 
const axiosInstance = axios.create({
  baseURL: 'https://webapp.hyperiontech.com.au/speakmydialect/api/', 
});
 
const token = localStorage.getItem('authToken');
 
if (token) {
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
}
 
export default axiosInstance;
