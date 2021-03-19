import Axios from 'axios'

export const getProduct = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/products/all')

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
            const res = await Axios.get('http://localhost:2000/products/carousel')

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