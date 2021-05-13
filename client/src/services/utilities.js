// Utility Functions

export function copyDeep(oldObj) {
  return JSON.parse(JSON.stringify(oldObj))
}

export function copyShallow(oldObj,newValues) {
  return Object.assign({}, oldObj, newValues)
}

export function updateObject(oldObj,newValues) {
  return copyShallow(oldObj,newValues)
}

export function updateItemInArray(arr, itemId, callback) {
  const updatedItems = arr.map(item => {
    if(item.id !== itemId) {
      return item
    }
    const updatedItem = callback(item)
    return updatedItem
  })
  return updatedItems
}

export function createReducer(initialState, handlers) {
  // makes a generic reducer function
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      // handler matching to make reducer = (state,action) => {}
      return handlers[action.type](state,action)
    } else {
      return state
    }
  }
}

// module.exports = {
//
// }
