export const foodReducer = (state,action) => {
  switch (action.type) {
    case 'NAME':
      return {...state, name:action.payload}
      break;
    case 'DESC':
      return {...state, desc:action.payload}
      break;
    case 'KCAL':
      return {...state, kCal:action.payload}
      break;
    default:
      return state
  }
}
