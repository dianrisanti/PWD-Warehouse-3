import Axios from 'axios'

export const getProduct = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/products/getproduct')

            dispatch({
                type: 'GET_PRODUCT',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getCarousel = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get('http://localhost:2000/products/getcarousel')

            dispatch({
                type: 'GET_CAROUSEL',
                payload: res.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const getProductDetail = (id) => {
    return async(dispatch) => {
        try{
            console.log('get product detail id', id)
            const res = await Axios.get(`http://localhost:2000/products/detail/${id}`)

            dispatch({
                type: 'GET_PRODUCT_DETAIL',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getCart = (id) => {
    return async(dispatch) => {
        try{
            const res = await Axios.get(`http://localhost:2000/cart/get/${parseInt(id)}`)
            console.log(res.data)
            dispatch({
                type: 'GET_CART',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}