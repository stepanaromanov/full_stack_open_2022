const initialState = { user: null
                        ,username: ''
                        ,password: ''
                        ,token: null }

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload}
        case 'SET_USERNAME':
            return {...state, username: action.payload}
        case 'SET_PASSWORD':
            return {...state, password: action.payload}
        case 'LOGGED_IN':
            return {user: action.payload, username: '', password: ''}
        case 'LOGGED_OUT':
            return initialState
        default:
            throw new Error(`Unknown action type: ${action.type}`)
    }
}

export default userReducer