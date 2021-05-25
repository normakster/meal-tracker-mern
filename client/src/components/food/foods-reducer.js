import api from '../../api'

export const foodsReducer = (state,action) => {
  switch (action.type) {
    case 'foods/fetchAll':
      if(action.payload) {
        return [...(action.payload)]
      }
      return state
      break;
    default:
      return state
  }
}
