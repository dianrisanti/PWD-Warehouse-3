import Axios from 'axios';
import { GET_CART} from './helper';

// edit qty in user's cart
export const EditCart = (input, id) => {
    return async (dispatch) => {
        try {
            // request api : EDIT
            const res = await Axios.patch('http://localhost:2000/cart/edit', input);
            console.log(res.data);
            console.log(input);

            // request api get cart data
            const cart = await Axios.get(`http://localhost:2000/cart/get/${parseInt(id)}`);
            dispatch({ type: GET_CART, payload: cart.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
};

// delete user's cart item
export const DeleteCart = (input, id) => {
    return async (dispatch) => {
        try {
            // request api : DELETE
            const res = await Axios.post('http://localhost:2000/cart/delete', input);
            console.log(res.data)
            console.log(input);

            // request api get cart data
            const cart = await Axios.get(`http://localhost:2000/cart/get/${parseInt(id)}`);
            dispatch({ type: GET_CART, payload: cart.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
};

export const CancelOrder = (order_number) => {
    return async (dispatch) => {
        try {
            // console.log(data, id)
            const option = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }

            const res = await Axios.post(`http://localhost:2000/cart/cancel/${order_number}`, option)
            console.log(res.data)

            const res2 = await Axios.get(`http://localhost:2000/user/getpayment/${order_number}`, option)
            console.log(res2.data)

            const token = localStorage.getItem('token')
            // console.log(token)

            // get user data from token
            const res3 = await Axios.post('http://localhost:2000/user/keepLogin', { token })
            // console.log('hasil dari api', res.data)

            dispatch({ type: 'LOG_IN', payload: res3.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const ConfirmArrived = (order_number) => {
    return async (dispatch) => {
        try {
            // console.log(data, id)
            const option = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }

            const res = await Axios.post(`http://localhost:2000/cart/confirm/${order_number}`, option)
            console.log(res.data)

            const res2 = await Axios.get(`http://localhost:2000/user/getpayment/${order_number}`, option)
            console.log(res2.data)

            const token = localStorage.getItem('token')
            // console.log(token)

            // get user data from token
            const res3 = await Axios.post('http://localhost:2000/user/keepLogin', { token })
            // console.log('hasil dari api', res.data)

            dispatch({ type: 'LOG_IN', payload: res3.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}