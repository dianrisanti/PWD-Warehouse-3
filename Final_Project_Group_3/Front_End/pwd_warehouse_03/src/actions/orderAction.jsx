import Axios from 'axios'

export const getOrder = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/cart/detail_order')

            dispatch({
                type: 'GET_ORDER',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}