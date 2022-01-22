import { updateObject, }  from './../services/utilities'

function pantryReducer(state, action) {
    switch (action.type) {
      case 'pantry/update':
        return state.map((item,i) => {
          if( item.food._id !== action.payload.id ) {
            return item
          }
          return updateObject({...item, [(action.payload.key)]: action.payload.value} );
        })
      case 'pantry/add':
        return [...state , { quantity: action.payload.quantity || 0, food: {...action.payload.food} }]
      case 'pantry/remove':
        return state.filter((item, index) => item.food._id !== action.payload.food._id)
      case 'pantry/fetch':
        if(action.payload !== undefined && action.payload) {
          return [...(action.payload)]
        }
        return state
      default:
        return state
    }
}

export default pantryReducer