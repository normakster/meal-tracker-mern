import http from '../services/axios.service';
import { handleResponse } from './index'

const post = async ( meal ) => {
  try {
    let result = http.post(`/meals/`, meal)
      .then(res => handleResponse(res))
    return result
  } catch (e) {
    console.error(e);
    return null
  }
}

const getAll = async () => {
  try {
    let result = await http.get(`/meals/`)
      .then(res => handleResponse(res))
    return result
  } catch (e) {
    console.error(e);
    return null
  }
}

export {
  post,
  getAll,
}
