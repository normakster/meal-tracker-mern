import { updateObject }  from '../../services/utilities'

export const initialState = {
  food: {
    _id: '',
    name: '',
    desc: '',
    kCal: 0,
    fat: 0,
    protein: 0,
    carb: 0,
  },
}

export const foodReducer = (state,action) => {
  switch (action.type) {
    case 'food/update':
      return {...state, [(action.payload.key)]:action.payload.value}
    case 'food_kcal/update':
      let kcal = (9*state.fat) + (4*state.protein) + (4*state.carb);
      return {...state, kCal:kcal}
    case 'food/init':
      return updateObject(state,action.payload)
    default:
      return state
  }
}
