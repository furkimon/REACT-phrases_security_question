export const initialState = {
    ready: true
}

const reducer = (state, action) => {

    switch (action.type) {
        case 'TOGGLE_NAVBAR':
            return {
                ...state, ready: !action.payload
            }
        case 'CHECK_WORDS':
            return { state }
        default:
            return { state }
    }
}

export default reducer;