const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    location: "",
    address: ""
}

const profileReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GET_PROFILE' :
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                location: action.payload.location,
                address: action.payload.address
            }
        default:
            return state
    }
}

export default profileReducer