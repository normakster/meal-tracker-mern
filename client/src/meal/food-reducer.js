import http from '../services/http.service'
import { updateObject, updateItemInArray, createReducer }  from './utilities'
import api from '../api'

function addFood(state, action) {
    const newFood = {
        _id: null,
        name: action.name,
        desc: action.desc,
        kCal: action.kCal,
    };

    return api.postFood(newFood)
        .then(res => {
          console.log(res);
          return res.data
        })
        .catch(err => {
          console.log(err)
          return null
        });
}

function updateFood(state, action) {
    return null
}

function deleteFood(state, action) {
    return null
}

export const foodReducer = createReducer([], {
    ADD_FOOD: addFood,
    UPDATE_FOOD: updateFood,
    DELETE_FOOD: deleteFood
})
