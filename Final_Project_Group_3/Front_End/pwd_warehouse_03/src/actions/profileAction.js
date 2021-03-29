import Axios from 'axios'

export const getProfile = (data) => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/profile/user', data)
            dispatch({ type: 'GET_PROFILE', payload: res.data })
        }
        catch(err){
            console.log(err)
        }
    }

}