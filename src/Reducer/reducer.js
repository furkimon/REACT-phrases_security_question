export const initialState = {
    ready: true,
    controlArray: [],
    checkArray: [],
    flag: false
}

const reducer = (state, action) => {

    switch (action.type) {
        case 'TOGGLE_NAVBAR':
            return { ...state, ready: !action.payload }
        case 'CONTROL_ARRAY':
            return { ...state, controlArray: action.payload }
        case 'CHECK_ARRAY':
            return { ...state, checkArray: action.payload }
        case 'COMPARE_ARRAYS':
            let one = [...state.controlArray]
            let two = [...state.checkArray]
            let newFlag
            if (JSON.stringify(one) === JSON.stringify(two)) newFlag = true
            else newFlag = false
            return { ...state, flag: newFlag }
        default:
            return { state }
    }
}

export default reducer;