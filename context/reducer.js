export const UPDATE_USER_INFO = "UPDATE_USER_INFO"
export const UPDATE_IS_AUTHENTICATED = "UPDATE_IS_AUTHENTICATED"

export const initialState = {
    isAuthenticated: null,
    user: null
}
export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO:
            return { ...state, user: action.payload }
        case UPDATE_IS_AUTHENTICATED:
            return { ...state, isAuthenticated: action.payload }
        default:
            return state
    }
}