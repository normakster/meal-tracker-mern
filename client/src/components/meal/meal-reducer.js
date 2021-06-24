import { updateObject, updateItemInArray }  from '../../services/utilities'

export function mealReducer(state, action) {
  switch (action.type) {
    case 'meal/update':
      return {...state, [(action.payload.key)]:action.payload.value}
    case 'meal_ingr/update':
      const newIngredients = updateItemInArray(state.ingredients, action.payload.id, ingr => {
        return updateObject(ingr, { serv: action.payload.serv })
      })
      return {...state, ingredients:newIngredients}
    case 'meal_food/add':
      return { ...state, ingredients: state.ingredients.concat({
        id: state.ingredients.reduce((maxId,item) => {
          return Math.max(maxId,item.id) + 1
        }, 0),
        serv: '',
        food: {...action.payload.food},
      })}
    case 'meal_food/remove':
      return { ...state,
        ingredients: state.ingredients.filter((item, index) => item.food._id !== action.payload.food._id),
      }
    case 'REMOVE_INGR':
      return {
        ...state,
        ingredients: state.ingredients.filter((item, index) =>
          item.id !== action.id
        )
      }
    case 'REMOVE_INGR_BYFOOD':
      return {
        ...state,
        ingredients: state.ingredients.filter((item, index) =>
          item.food._id !== action.food._id
        )
      }
    case 'meal/init':
      console.log('Reset Meal');
      return updateObject(state,action.payload)
    default:
      return state
  }
}
