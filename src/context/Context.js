import React, { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case ('TYPE_TYPE'):
            return { ...state }
        default:
            return { state }
    }
    
}

export const Provider = ({children}) => {
    const [data, dispatch] = useReducer(reducer, [])
    const f
}

export default context