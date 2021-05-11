import { updateObject, updateItemInArray, createReducer }  from './utilities'

// Actions and assemble Reducer
// *acceptable immutable functions: concat, slice, map, filter

function addIngr(state, action) {
  console.log('Adding Ingredient');
  console.log(JSON.stringify(state));
  const newID = state.reduce((maxId,item) => {
    return Math.max(maxId,item.id) + 1
  }, 0);
  const newIngr = state.concat({
    id: newID,
    serv: 0,
    food: action.food,
  })
  return newIngr
}

function removeIngr(state, action) {
  console.log('Removing Ingredient');
  return state.filter((item, index) => item.id !== action.id)
}

function removeIngrByFood(state, action) {
  console.log('Removing Ingredient');
  if(action.food) {
    return state.filter((item, index) => item.food._id !== action.food._id)
  }
  return state
}

function editIngr(state, action) {
  console.log('Editing Ingredient');
  const newIngredients = updateItemInArray(state, action.id, ingr => {
    return updateObject(ingr, { text: action.text })
  })
  return newIngredients
}

export const ingredientsReducer = createReducer([], {
  ADD_INGR: addIngr,
  REMOVE_INGR: removeIngr,
  REMOVE_INGR_BYFOOD: removeIngrByFood,
  EDIT_INGR: editIngr
})
