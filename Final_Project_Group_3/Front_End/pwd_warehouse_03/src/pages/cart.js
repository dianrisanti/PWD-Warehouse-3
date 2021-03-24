import React from 'react'
import Axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Form, Modal, Image, Alert } from 'react-bootstrap'
import {
    EditCart,
    DeleteCart
} from '../actions';

const CartPage = () => {
    const [data, setData] = React.useState([])
    const [loc, setLoc] = React.useState(false)
    const [noLoc, setNoLoc] = React.useState(false)
    const [editIndex, setEditIndex] = React.useState(null)
    const [qty, setQty] = React.useState(0)
    const [qtyErr, setQtyErr] = React.useState([false, ""])

    const { id, location, address, products, cart } = useSelector((state) => {
        return {
            id: state.user.id_user,
            location: state.user.location,
            address: state.user.address,
            products: state.product.products,
            cart: state.product.cart
        }
    })

    const dispatch = useDispatch();

    React.useEffect(() => {
        Axios.get(`http://localhost:2000/cart/get/${parseInt(id)}`)
            .then(res => (setData(res.data)))
            .catch(err => console.log(err))
    }, [id, data, qty])

    const deleteHandler = (itemId) => {
        const num = data[0].order_number
        const input = {
            id_product: itemId,
            order_number: num
        }
        dispatch(DeleteCart(input, id))
        console.log(input)
    }

    const saveHandler = (itemId) => {
        const num = data[0].order_number
        const price = data[editIndex].price
        const input = {
            id_product: itemId,
            order_number: num,
            qty,
            total: price * qty
        }
        dispatch(EditCart(input, id))
        setEditIndex(null)
        console.log(input)
    }


    const changeQty = (e) => {
        const input = e.target.value

        if (isNaN(+input)) return setQty(0)
        if (+input > products[0].total_stock) return setQtyErr([true, `Maks. pembelian barang ini ${products[0].total_stock} item`])

        setQty(+input)
        setQtyErr([false, ""])
    }

    const checkoutHandler = () => {
        console.log('checkout clicked')

        if (!location || !address) return setNoLoc(true)
        if (location) return setLoc(true)
    }

    const renderTable = () => {
        return data.map((item, index) => {
            return (
                index === editIndex
                    ?
                    <tr key={index}>
                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                        <td>
                            <Image style={{ width: 60, height: 60, marginRight: "15px" }} src={item.image} rounded />
                            {item.name}
                        </td>
                        <td style={{ textAlign: 'right' }}>{item.price}</td>
                        <td style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex' }}>
                                <button
                                    disabled={qty <= 0 ? true : false}
                                    onClick={() => setQty(qty - 1)}
                                    style={{ height: "2rem", margin: "10px", borderRadius: "30px" }}
                                ><i className="fas fa-minus"></i></button>
                                <Form.Control style={{ width: '90px', fontSize: '20px' }} onChange={(e) => changeQty(e)} value={qty} min={0} />
                                <button
                                    disabled={qty >= products.total_stock ? true : false}
                                    onClick={() => setQty(qty + 1)}
                                    style={{ height: "2rem", margin: "10px", borderRadius: "30px" }}
                                ><i className="fas fa-plus"></i></button>
                            </div>
                        </td>
                        <td style={{ textAlign: 'right' }}>{item.price * qty}</td>
                        <td style={{ textAlign: 'center' }}>
                            <Button variant="outline-success" style={{ marginRight: '5px' }} onClick={() => saveHandler(item.id_product)}> ✔ </Button>
                            <Button variant="outline-danger" style={{ marginLeft: '5px' }} onClick={() => setEditIndex(null)}> ❌ </Button>
                        </td>
                    </tr>
                    :
                    <tr key={index}>
                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                        <td>
                            <Image style={{ width: 60, height: 60, marginRight: "15px" }} src={item.image} rounded />
                            {item.name}
                        </td>
                        <td style={{ textAlign: 'right' }}>IDR {item.price.toLocaleString()}</td>
                        <td style={{ textAlign: 'center', fontFamily:'Lobster, cursive' }}>{item.quantity} pcs</td>
                        <td style={{ textAlign: 'right' }}>IDR {item.total.toLocaleString()}</td>
                        <td style={{ textAlign: 'center' }}>
                            <Button variant="warning" style={{ marginRight: '5px' }} onClick={() => setEditIndex(index)}> Edit </Button>
                            <Button variant="danger" style={{ marginLeft: '5px' }} onClick={() => deleteHandler(item.id_product)}> Delete </Button>
                        </td>
                    </tr>
            )
        })
    }

    if (!id) return <Redirect to='/' />
    if (loc) return <Redirect to="/checkout" />
    return (
        <div style={{ marginTop: "138px" }}>
            <Alert show={noLoc} variant="danger" onClose={() => setNoLoc(false)} dismissible>
                Mohon lengkapi lokasi dan alamat pada
                <Alert.Link as={Link} to='./profile'> profile Anda </Alert.Link>
                sebelum membuat pesanan
            </Alert>

            <Table striped bordered hover variant="dark">
                <thead style={{ backgroundColor: '#2f3640', textAlign: 'center' }}>
                    <tr style={{fontFamily:'Roboto, sans-serif'}}>
                        <th>No</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
            </Table>
            <Button style={styles.checkout} onClick={checkoutHandler}>
                <i className="fas fa-plus"></i> Checkout
            </Button>
        </div>
    )
}

const styles = {
    container: {
        marginTop: "138px",
        padding: "0 20px",
        fontFamily: "PT Serif",
        paddingBottom: '30px'
    },
    content: {
        display: "flex",
        height: "80vh"
    },
    left: {
        display: "flex",
        flexBasis: "40%",
        justifyContent: "center",
        alignItems: "center",
    },
    right: {
        display: "flex",
        flexDirection: "column",
        flexBasis: "60%",
        justifyContent: "space-between",
        padding: "0 20px"
    },
    description: {
        fontSize: "13px",
        fontWeight: "350",
    },
    size: {
        display: "flex",
        justifyContent: "space-between"
    },
    qty: {
        display: "flex",
        width: "30%",
    },
    buttonQty: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    checkout: {
        width: "20%",
        height: "8%",
        backgroundColor: "#118ab2",
        marginLeft: 550
    }
}

export default CartPage