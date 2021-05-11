import { updateObject, updateItemInArray, createReducer }  from './utilities'

// Actions and assemble Reducer
// *acceptable immutable functions: concat, slice, map, filter

function addIngr(state, action) {
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
  return state.filter((item, index) => item.id !== action.id)
}

function removeIngrByFood(state, action) {
  if(action.food) {
    return state.filter((item, index) => item.food._id !== action.food._id)
  }
  return state
}

function editIngrServ(state, action) {
  const newIngredients = updateItemInArray(state, action.id, ingr => {
    return updateObject(ingr, { serv: action.serv })
  })
  return newIngredients
}

export const ingredientsReducer = createReducer([], {
  ADD_INGR: addIngr,
  REMOVE_INGR: removeIngr,
  REMOVE_INGR_BYFOOD: removeIngrByFood,
  EDIT_INGR_SERV: editIngrServ
})
