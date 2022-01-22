import { copyDeep, copyShallow } from '../services/utilities'

function scannerReducer (state, action) {
    switch (action.type) {

        case 'scanner/init':
            return copyShallow(state,action.payload)
        default:
            return state
    }
}

export default scannerReducer