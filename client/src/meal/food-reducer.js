import { updateObject }  from './utilities'

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
    case 'NAME':
      return {...state, name:action.payload}
      break;
    case 'DESC':
      return {...state, desc:action.payload}
      break;
    case 'KCAL':
      let kcal = (9*state.fat) + (4*state.protien) + (4*state.carb);
      return {...state, kCal:kcal}
      break;
    case 'FAT':
      return {...state, fat:action.payload}
      break;
    case 'PROTIEN':
      return {...state, protien:action.payload}
      break;
    case 'CARB':
      return {...state, carb:action.payload}
      break;
    case 'INIT':
      return updateObject(state,action.payload)
      break;
    default:
      return state
  }
}
