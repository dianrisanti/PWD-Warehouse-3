import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useSelector} from 'react-redux'

export const login = (data) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('http://localhost:2000/user/login', data)
            // console.log(res.data)

            localStorage.token = res.data.token

            dispatch({ type: 'LOG_IN', payload: res.data })
        }
        catch (err) {
            dispatch({ type: 'LOGIN_ERR', payload: err.response.data })
            console.log(err ? `ERROR : ${err.response.data}` : err)
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem('token')
            await dispatch({ type: 'LOG_OUT' })
        }
        catch (err) {
            console.log(err)
        }

    }
}

export const verification = () => {
    return {
        type: 'VERIFICATION'
    }
}

export const paymentConf = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PAYMENTCONFIRMATION', payload: data })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const keepLogin = () => {
    return async (dispatch) => {
        try {
            // console.log('keep login')
            // get token from local storage
            const token = localStorage.getItem('token')
            // console.log(token)

            // get user data from token
            const res = await Axios.post('http://localhost:2000/user/keepLogin', { token })
            // console.log('hasil dari api', res.data)

            dispatch({ type: 'LOG_IN', payload: res.data })
        }
        catch (err) {
            console.log(err)
            dispatch({ type: 'LOG_OUT' })
            localStorage.removeItem('id')
            localStorage.removeItem('token')
        }
    }
}

export const editProfile = (data, id) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(`http://localhost:2000/profile/edit/${parseInt(id)}`, data)
            console.log('hasil respon: ', res.data)

            const token = localStorage.getItem('token')

            const res2 = await Axios.post('http://localhost:2000/user/keeplogin', { token })
            dispatch({ type: 'LOG_IN', payload: res2.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const upload = (pict, order_number) => {
    return async (dispatch) => {
        try {
            // console.log(data, id)
            const option = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }

            const res = await Axios.post(`http://localhost:2000/user/upload_payment/${order_number}`, pict, option)
            console.log(res.data)

            const token = localStorage.getItem('token')
            // console.log(token)

            // get user data from token
            const res2 = await Axios.post('http://localhost:2000/user/keepLogin', { token })
            // console.log('hasil dari api', res.data)

            dispatch({ type: 'LOG_IN', payload: res2.data })
        }
        catch (err) {
            console.log(err)
        }
    }

}

export const getPaymentConf = (order_number) => {
    return async (dispatch) => {
        try {
            // console.log(data, id)
            const option = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }

            const res = await Axios.get(`http://localhost:2000/user/getpayment/${order_number}`, option)
            console.log(res.data)

            const token = localStorage.getItem('token')
            // console.log(token)

            // get user data from token
            const res2 = await Axios.post('http://localhost:2000/user/keepLogin', { token })
            // console.log('hasil dari api', res.data)

            dispatch({ type: 'LOG_IN', payload: res2.data })
        }
        catch (err) {
            console.log(err)
        }
    }

}