import { GET_CART } from '../actions/helper';

const INITIAL_STATE = {
    products: [],
    carousel: [],
    productDetail: [],
    cart: []
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GET_PRODUCT': 
            return {
                ...state,
                products: action.payload
            }
        case 'GET_CAROUSEL' :
            return {
                ...state,
                carousel: action.payload
            }
        case 'GET_PRODUCT_DETAIL' :
            return {
                ...state,
                productDetail: action.payload
            }
        case 'GET_CART' : 
            return {
                ...state,
                cart: action.payload
            }
        default:
            return state
    }
}

export default productReducer