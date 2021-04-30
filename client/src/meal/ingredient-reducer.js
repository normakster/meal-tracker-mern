import { updateObject, updateItemInArray, createReducer }  from './utilities'

// Actions and assemble Reducer
// *acceptable immutable functions: concat, slice, map, filter

function addIngr(ingrState, action) {
  console.log('Adding Ingredient');
  console.log(JSON.stringify(ingrState));
  const newID = ingrState.reduce((maxId,item) => {
    return Math.max(maxId,item.id) + 1
  }, 0);
  const newIngr = ingrState.concat({
    id: newID,
    serv: 0,
    food: action.food,
  })
  return newIngr
}

function removeIngr(ingrState, action) {
  console.log('Removing Ingredient');
  return ingrState.filter((item, index) => item.id !== action.id)
}

function removeIngrByFood(ingrState, action) {
  console.log('Removing Ingredient');
  if(action.food) {
    return ingrState.filter((item, index) => item.food._id !== action.food._id)
  }
  return ingrState
}

function editIngr(ingrState, action) {
  console.log('Editing Ingredient');
  const newIngredients = updateItemInArray(ingrState, action.id, ingr => {
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
