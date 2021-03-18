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