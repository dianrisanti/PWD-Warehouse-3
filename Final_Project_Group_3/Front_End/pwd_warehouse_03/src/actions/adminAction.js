import Axios from 'axios'

export const getProductStock = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/admin/getstock')
            dispatch({ type: 'GET_PRODUCT_STOCK', payload: res.data })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getProduct = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/admin/getall')

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


export const confirmPayment = (data) => {
    return async(dispatch) => {
        try{
            let status = {status: 4}
            const res = await Axios.post(`http://localhost:2000/admin/confirmPayment/${data}`, status)
            console.log(res.data)

            dispatch({
                type: 'SET_PAYMENT_STATUS',
                payload: res.data
              })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getCategory = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/admin/getcategory')

            dispatch({
                type: 'GET_CATEGORY',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const cancelOrder = (data) => {
    return async(dispatch) => {
        try{
            let status = {status: 5}
            const res = await Axios.post(`http://localhost:2000/admin/confirmPayment/${data}`, status)
            console.log(res.data)

            dispatch({
                type: 'SET_PAYMENT_STATUS',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const deleteCategory = (input) => {
    return async (dispatch) => {
        try {
            // request api : DELETE
            const res = await Axios.post('http://localhost:2000/admin/deletecategory', input);
            console.log(res.data)
            console.log(input);

            // request api get cart data
            const res2 = await Axios.get(`http://localhost:2000/admin/getall`);
            dispatch({ type: 'GET_CATEGORY', payload: res2.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    }
}

export const editCategory = (input) => {
    return async (dispatch) => {
        try {
            // request api : EDIT
            const res = await Axios.post('http://localhost:2000/admin/editcategory', input);
            console.log(res.data)
            console.log(input);

            // request api get cart data
            const res2 = await Axios.get(`http://localhost:2000/admin/getall`);
            dispatch({ type: 'GET_CATEGORY', payload: res2.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
}

export const addCategory = (newInput) => {
    return async (dispatch) => {
        try {
            // request api : ADD
            const res = await Axios.post('http://localhost:2000/admin/addcategory', newInput);
            console.log(res.data)
            console.log(newInput);

            // request api get cart data
            const res2 = await Axios.get(`http://localhost:2000/admin/getall`);
            dispatch({ type: 'GET_CATEGORY', payload: res2.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
}

export const EditJakarta = (input) => {
    return async (dispatch) => {
        try {
            // request api : EDIT
            const res = await Axios.post('http://localhost:2000/admin/editjakarta', input);
            console.log(res.data);
            console.log(input);

            // request api get cart data
            const cart = await Axios.get(`http://localhost:2000/admin/getall`);
            dispatch({ type: "GET_CATEGORY", payload: cart.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
};

export const EditMedan = (input) => {
    return async (dispatch) => {
        try {
            // request api : EDIT
            const res = await Axios.post('http://localhost:2000/admin/editmedan', input);
            console.log(res.data);
            console.log(input);

            // request api get cart data
            const cart = await Axios.get(`http://localhost:2000/admin/getall`);
            dispatch({ type: "GET_CATEGORY", payload: cart.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
};

export const EditSurabaya = (input) => {
    return async (dispatch) => {
        try {
            // request api : EDIT
            const res = await Axios.post('http://localhost:2000/admin/editsurabaya', input);
            console.log(res.data);
            console.log(input);

            // request api get cart data
            const cart = await Axios.get(`http://localhost:2000/admin/getall`);
            dispatch({ type: "GET_CATEGORY", payload: cart.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
};

export const EditProduct = (input) => {
    return async (dispatch) => {
        try {
            // request api : EDIT
            const res = await Axios.post('http://localhost:2000/admin/editproduct', input);
            console.log(res.data);
            console.log(input);

            // request api get cart data
            const cart = await Axios.get(`http://localhost:2000/admin/getall`);
            dispatch({ type: "GET_CATEGORY", payload: cart.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
};

export const DeleteProduct = (input) => {
    return async (dispatch) => {
        try {
            // request api : DELETE
            const res = await Axios.post('http://localhost:2000/admin/deleteproduct', input);
            console.log(res.data);
            console.log(input);

            // request api get cart data
            const cart = await Axios.get(`http://localhost:2000/admin/getall`);
            dispatch({ type: "GET_CATEGORY", payload: cart.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
};

export const AddProduct = (input) => {
    return async (dispatch) => {
        try {
            // request api : ADD
            const res = await Axios.post('http://localhost:2000/admin/addproduct', input);
            console.log(res.data);
            console.log(input);

            // request api get cart data
            const cart = await Axios.get(`http://localhost:2000/admin/getall`);
            dispatch({ type: "GET_CATEGORY", payload: cart.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
};