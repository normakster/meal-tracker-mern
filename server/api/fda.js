const http = require('axios');
const settings = require('../config/settings');

http.interceptors.response.use(null, error => {
  return Promise.reject(error);
});

function handleResponse(res) {
  if (res.status >= 400 && res.status < 600) {
    throw new Error("Bad response");
  }
  return res.data;
}

const key = settings.api.FDA_KEY;
const url = 'https://api.nal.usda.gov/fdc/v1/';

module.exports = {

  search: async (obj) => {
    try {
      let result = await http.post(url + 'foods/search?api_key=' + key, obj)
        .then(res => handleResponse(res))
      return result
    } catch (e) {
      console.error(e);
      return null
    }
  },

  byFcdID: async (id) => {
    try {
      let result = await http.get(url + 'food/' + id + '?api_key=' + key)
        .then(res => handleResponse(res))
      return result
    } catch (e) {
      console.error(e);
      return null
    }
  }
};
