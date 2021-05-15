import { updateObject, updateItemInArray }  from '../../services/utilities'

export function mealReducer(state, action) {
  switch (action.type) {
    case 'DATE':
      return {...state, date:action.payload}
      break;
    case 'TIME':
      return {...state, time:action.payload}
      break;
    case 'LOCATION':
      return {...state, location:action.payload}
      break;
    case 'ADD_INGR':
      return {
        ...state,
        ingredients: state.ingredients.concat({
          id: state.ingredients.reduce((maxId,item) => {
            return Math.max(maxId,item.id) + 1
          }, 0),
          serv: '',
          food: action.food,
        })
      }
      break;
    case 'REMOVE_INGR':
      return {
        ...state,
        ingredients: state.ingredients.filter((item, index) =>
          item.id !== action.id
        )
      }
      break;
    case 'REMOVE_INGR_BYFOOD':
      return {
        ...state,
        ingredients: state.ingredients.filter((item, index) =>
          item.food._id !== action.food._id
        )
      }
      break;
    case 'EDIT_INGR_SERV':
      const newIngredients = updateItemInArray(state.ingredients, action.id, ingr => {
        return updateObject(ingr, { serv: action.serv })
      })
      return {...state, ingredients:newIngredients}
      break;
    default:
      return state
  }
}
