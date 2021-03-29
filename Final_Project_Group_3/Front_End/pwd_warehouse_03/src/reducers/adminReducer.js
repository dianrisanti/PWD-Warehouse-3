const INITIAL_STATE = {
    productStock: [],
    products: [],
    status: "",
    category: []
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_PRODUCT':
            return {
                ...state,
                products: action.payload
            }
        case 'GET_PRODUCT_STOCK':
            return {
                ...state,
                productStock: action.payload
            }
        case 'SET_STATUS_PAYMENT':
            return {
                ...state,
                status: action.payload
            }
        case 'GET_CATEGORY':
            return {
                ...state,
                category: action.payload
            }
        default:
            return state
    }
}

export default adminReducer