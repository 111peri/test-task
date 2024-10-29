import axios from 'axios';

const API_URL = 'http://api.calmplete.net/api';
const apiService = axios.create({ baseURL: API_URL });


apiService.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : ''; 
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default apiService;
