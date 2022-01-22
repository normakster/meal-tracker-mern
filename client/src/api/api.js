import http from 'axios';
import settings from '../config/settings';

http.defaults.baseURL = settings.apiURL + '/api';

http.interceptors.response.use(null, error => {
  return Promise.reject(error);
});

function handleResponse(res) {
  if (res.status >= 400 && res.status < 600) {
    return res.data;
  }
  // if (!res.headers.get("content-type").includes("application/json")) {
  //   throw new TypeError("Response not JSON");
  // }
  // console.log(res.data);
  return res.data;
}

export default function Api(pathname) {

  this.pathname = pathname;

  this.post = async (obj) => {
    try {
      let result = await http.post(`/${this.pathname}/`, obj)
        .then(res => handleResponse(res))
      return result
    } catch (e) {
      console.error(e);
      return null
    }
  };

  this.get = async ( id ) => {
    try {
      let result = await http.get(`/${this.pathname}/${id}`)
        .then(res => handleResponse(res))
      return result
    } catch (e) {
      console.error(e);
      return null
    }
  };

  this.put = async ( obj ) => {
    try {
      let result = await http.put(`/${this.pathname}/${obj._id}`, obj)
        .then(res => handleResponse(res))
      return result
    } catch (e) {
      console.error(e);
      return null
    }
  };

  this.remove = async ( id ) => {
    try {
      let result = await http.delete(`/${this.pathname}/${id}`)
        .then(res => handleResponse(res))
      return result
    } catch (e) {
      console.error(e);
      return null
    }
  };

  this.getAll = async () => {
    try {
      let result = await http.get(`/${this.pathname}/`)
        .then(res => handleResponse(res))
      return result
    } catch (e) {
      console.error(e);
      return null
    }
  };
};
