import http from '../services/axios.service';
import { handleResponse } from './index'

const post = async ( meal ) => {
  try {
    let result = await http.post(`/meals/`, meal)
      .then(res => handleResponse(res))
    return result
  } catch (e) {
    console.error(e);
    return null
  }
}

const get = async ( id ) => {
  try {
    let result = await http.get(`/meals/${id}`)
      .then(res => handleResponse(res))
    return result
  } catch (e) {
    console.error(e);
    return null
  }
}

const put = async ( meal ) => {
  try {
    let result = await http.put(`/meals/${meal._id}`, meal)
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
  put,
  get,
  post,
  getAll,
}
