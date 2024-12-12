import axios from 'axios';
 
const axiosInstance = axios.create({
  baseURL: 'https://dev.kahayfaqeer.org/api/', 
});
 
const token = localStorage.getItem('authToken');
 
if (token) {
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
}
 
export default axiosInstance;
