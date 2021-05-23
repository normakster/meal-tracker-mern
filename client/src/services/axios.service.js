import { apiURL } from '../config/settings'
import axios from 'axios';

axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = 'http://localhost:5000' + '/api';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(null, error => {
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
