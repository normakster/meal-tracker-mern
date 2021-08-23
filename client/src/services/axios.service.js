import axios from 'axios';
import settings from '../config/settings';

axios.defaults.baseURL = settings.apiURL + '/api';

axios.interceptors.response.use(null, error => {
  return Promise.reject(error);
});

const httpServiceDI = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpServiceDI
