import { copyDeep } from '../services/utilities'

function foodReducer (state, action) {
    switch (action.type) {
        case 'food/update':
            return {...state, [(action.payload.key)]:action.payload.value}
        case 'food_nutri/update':
            return {...state, ['labelNutrients']:Object.assign({}, state['labelNutrients'], {[(action.payload.key)]:action.payload.value})}
        case 'food/calories':
            return {...state, ['labelNutrients']:Object.assign({}, state['labelNutrients'],{calories: ( state.labelNutrients.fat * 9 ) + ( state.labelNutrients.protein * 4 ) + ( state.labelNutrients.carbohydrates * 4 )})}
        case 'food/init':
            return copyDeep(action.payload)
        default:
            return state
    }
}

export default foodReducer