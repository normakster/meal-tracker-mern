import { updateObject, updateItemInArray }  from './../services/utilities'

function mealReducer(state, action) {
    switch (action.type) {
      case 'meal/update':
        return {...state, [(action.payload.key)]:action.payload.value}
      case 'meal_ingr/update':
        const newIngredients = updateItemInArray(state.ingredients, action.payload.id, ingr => {
          return updateObject(ingr, { servings: action.payload.servings })
        })
        return {...state, ingredients:newIngredients}
      case 'meal_food/add':
        return { ...state, ingredients: state.ingredients.concat({
          id: state.ingredients.reduce((maxId,item) => {
            return Math.max(maxId,item.id) + 1
          }, 0),
          servings: '',
          food: {...action.payload.food},
          quantity: action.payload.quantity,
          pantry_id: action.payload.id,
        })}
      case 'meal_food/remove':
        return { ...state,
          ingredients: state.ingredients.filter((item, index) => item.food._id !== action.payload.food._id),
        }
      case 'meal/init':
        console.log('Reset Meal');
        return action.payload
      default:
        return state
    }
}

export default mealReducer