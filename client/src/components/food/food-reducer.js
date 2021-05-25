import { updateObject }  from '../../services/utilities'

export const initialState = {
  food: {
    _id: '',
    name: '',
    desc: '',
    kCal: 0,
    fat: 0,
    protien: 0,
    carb: 0,
  },
}

export const foodReducer = (state,action) => {
  switch (action.type) {
    case 'food/update':
      return {...state, [(action.payload.key)]:action.payload.value}
      break;
    case 'food_kcal/update':
      let kcal = (9*state.fat) + (4*state.protien) + (4*state.carb);
      return {...state, kCal:kcal}
      break;
    case 'food/init':
      return updateObject(state,action.payload)
      break;
    default:
      return state
  }
}
