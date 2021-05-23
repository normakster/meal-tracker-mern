import { updateObject, updateItemInArray }  from '../../services/utilities'

export function mealReducer(state, action) {
  switch (action.type) {
    case 'meal_date/update':
      return {...state, date: action.payload}
      break;
    case 'meal_time/update':
      return {...state, time: action.payload}
      break;
    case 'meal_location/update':
      return {...state, location: action.payload}
      break;
    case 'meal_ingr/update':
      const newIngredients = updateItemInArray(state.ingredients, action.payload.id, ingr => {
        return updateObject(ingr, { serv: action.payload.serv })
      })
      return {...state, ingredients:newIngredients}
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
    case 'INIT':
      console.log('Reset Meal');
      return updateObject(state,action.payload)
      break;
    default:
      return state
  }
}
