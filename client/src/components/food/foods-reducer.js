import api from '../../api'

export const foodsReducer = (state,action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      if(action.food) {
        return [...state,action.food]
      }
      return state
      break;
    case 'UPDATE_FOOD':
      return state.map(food => {
        if(food._id !== action.food._id) {
          return food
        }
        return {...food,...action.food}
      })
      break;
    case 'FETCH_ALL':
      if(action.foods) {
        return [...(action.foods)]
      }
      return state
      break;
    case 'CHECK_STATE':
      console.log(state);
      return state
      break;
    default:
      return state
  }
}
