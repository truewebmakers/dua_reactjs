import axios from 'axios';
 
const axiosInstance = axios.create({
  baseURL: 'https://app.kahayfaqeer.org/api/', 
});
 
const token = localStorage.getItem('authToken');
 
if (token) { 
  axiosInstance.defaults.headers['Content-Type'] = 'application/json';
  axiosInstance.defaults.headers['Accept'] = 'application/json';
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
}
 
export default axiosInstance;
