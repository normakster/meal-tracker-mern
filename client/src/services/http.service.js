import httpServiceDI from './axios.service';

export default {
    get: httpServiceDI.get,
    post: httpServiceDI.post,
    put: httpServiceDI.put,
    delete: httpServiceDI.delete
  };