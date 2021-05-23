import http from '../services/axios.service';
import { handleResponse } from './index'

const post = async ( food ) => {
  try {
    let result = http.post(`/foods/`, food)
      .then(res => handleResponse(res))
    return result
  } catch (e) {
    console.error(e);
    return null
  }
}

const get = async ( id ) => {
  try {
    let result = http.get(`/foods/${id}`)
      .then(res => handleResponse(res))
    return result
  } catch (e) {
    console.error(e);
    return null
  }
}

const put = async ( food ) => {
  try {
    let result = await http.put(`/foods/${food._id}`, food)
      .then(res => handleResponse(res))
    return result
  } catch (e) {
    console.error(e);
    return null
  }
}

const remove = async ( id ) => {
  try {
    let result = await http.delete(`/foods/${id}`)
      .then(res => handleResponse(res))
    return result
  } catch (e) {
    console.error(e);
    return null
  }
}

const getAll = async () => {
  try {
    let result = await http.get(`/foods/`)
      .then(res => handleResponse(res))
    return result
  } catch (e) {
    console.error(e);
    return null
  }
}

export {
    post,
    get,
    put,
    remove,
    getAll,
}
