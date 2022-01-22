function statsReducer(state, action) {
    switch (action.type) {
      case 'statBox/update':
        let food = action.payload.food;
        let serv = action.payload.serv;
        return {...state,
          calories: (state.calories + (food.calories * serv)),
          fat: (state.fat + (food.fat * serv)),
          protein: (state.protein + (food.protein * serv)),
          carbohydrates: (state.carbohydrates +(food.carbohydrates * serv))
        }
      case 'reset':
        return {...state, ...(action.payload)}
      default:
        return state
    }
}

export default statsReducer