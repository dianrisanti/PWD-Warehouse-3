import React from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import {
    Card,
    Dropdown,
    Pagination,
    Button,
    Accordion,
    Table,
    Image,
    Modal,
    InputGroup,
    FormControl
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { confirmPayment, getOrder, cancelOrder } from '../actions'

const OrderListing = () => {
    const { data } = useSelector((state) => {
        return {
            data: state.order.orders
        }
    })

    console.log(data)
    const dispatch = useDispatch()

    // NOTE filter harga dan nama
    const options = [
        'Nama A - Z',
        'Nama Z - A',
        'Total Belanja Tertinggi',
        'Total Belanja Terendah',
    ]
    const [selectedOption, setSelectedOption] = React.useState("")
    const [dataUser, setDataUser] = React.useState([]) // NOTE data user
    let [refresh, setRefresh] = React.useState(0)
    let [alert, setAlert] = React.useState(false)
    let [orderNumber, setOrderNumber] = React.useState("")
    let Message = React.useRef('')

    console.log("value orderNum :", orderNumber)


    React.useEffect(() => {
        async function fetchData() {
            try {
                let res = await Axios.get(`http://localhost:2000/user/getUser`)
                setDataUser(res.data)
                dispatch(getOrder())
            }
            catch (err) {
                console.log(err)
            }

        }
        fetchData()
    }, [refresh])

    console.log('data :', data)
    console.log('data user :', dataUser)


    const handleClickListItem = (index) => {
        const input = options[index]
        setSelectedOption(input)

        if (index === 0) return data.sort((a, b) => a.username.localeCompare(b.username))
        if (index === 1) return data.sort((a, b) => -1 * a.username.localeCompare(b.username))
        if (index === 2) return data.sort((a, b) => b.total_belanja - a.total_belanja)
        if (index === 3) return data.sort((a, b) => a.total_belanja - b.total_belanja)
    }

    const [selectedUser, setSelectedUser] = React.useState("")
    const itemsPerPage = 3
    const [page, setPage] = React.useState(1)
    const noOfPages = selectedUser ? 1 : Math.ceil(data.length / itemsPerPage)
    const listItem = Array(noOfPages).fill(1)

    const handleClickListUser = (index) => {
        const input = dataUser[index]
        setSelectedUser(input.username)

        if (input.username === 'All') return setSelectedUser("")
        setPage(1)
    }
    console.log('selectedUser :', selectedUser)


    const goToDetail = (index) => {
        console.log(index)
        return <Redirect to={`/detail?id=${index}`} />
    }

    function handlePaymentCon(orderNum) {
        async function fetchData() {
            try {
                await Axios.post(`http://localhost:2000/cart/delivery_stock`, {order_number: orderNum})
                dispatch(confirmPayment(orderNum))
                let useRefresh = refresh
                setRefresh(refresh + 1)
                console.log("refresh request executed =", useRefresh, "times")
            }
            catch (err) {
                console.log(err)
            }

        }
        fetchData()
    }

    function handleCancelOrder(orderNum) {
        async function fetchData() {
            try {
                await Axios.post(`http://localhost:2000/cart/cancel_stock`, {order_number: orderNum})
                dispatch(cancelOrder(orderNum))
                setOrderNumber(orderNum)
                let useRefresh = refresh
                setRefresh(refresh + 1)
                setAlert(true)
                console.log("refresh request executed =", useRefresh, "times")
            }
            catch (err) {
                console.log(err)
            }

        }
        fetchData() 
    }

    function handleCancelMessage() {
        let CancelMsg = {message: Message.current.value}


        Axios.post(`http://localhost:2000/admin/cancelOrder/${orderNumber}`, CancelMsg)
            .then((res) => {
                console.log(res.data)
                let useRefresh = refresh
                setRefresh(refresh + 1)
                console.log("refresh request executed =", useRefresh, "times")
                setAlert(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div style={{ marginTop: "150px", padding: "0 20px" }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '40px' }}>
                <h3 style={{ marginRight: 10, marginLeft: 50 }}>Order Listing</h3>
                <div style={{ display: 'flex', flexDirection: 'row', width: 400 }}>
                    <h3 style={{ marginLeft: 10 }}>Filter by User</h3>
                    <Dropdown style={{}}>
                        <Dropdown.Toggle style={{ backgroundColor: "transparent", fontFamily: "Dosis", width: '170px', color: 'black', marginLeft: 10 }} id="dropdown-basic">
                            {selectedUser ? selectedUser : "Berdasarkan"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ height: '200px', overflowY: 'scroll' }}>
                            {dataUser.map((item, index) => {
                                return (
                                    <Dropdown.Item key={index} onClick={() => handleClickListUser(index)}>{item.username}</Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: 350 }}>
                    <h3 style={{ marginRight: 10 }}>Sort By</h3>
                    <Dropdown style={{ marginRight: "4%" }}>
                        <Dropdown.Toggle style={{ backgroundColor: "transparent", fontFamily: "Dosis", color: 'black' }} id="dropdown-basic">
                            {selectedOption ? selectedOption : "Berdasarkan"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {options.map((item, index) => {
                                return (
                                    <Dropdown.Item key={index} onClick={() => handleClickListItem(index)}>{item}</Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>
                    <Pagination>
                        <Pagination.Prev disabled={page <= 1 ? true : false} onClick={() => setPage(page - 1)} />
                        {listItem.map((item, index) => {
                            return (
                                <Pagination.Item key={index} active={index + 1 === page} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
                            )
                        })}
                        <Pagination.Next disabled={page >= noOfPages ? true : false} onClick={() => setPage(page + 1)} />
                    </Pagination>
                </div>
            </div>


            <div style={{ marginTop: "20px", padding: "0 20px", height: 300 }}>
                <Table striped bordered hover style={{ textAlign: "center" }}>
                    {selectedUser
                        ?
                        // console.log(data.filter(item => item.username === selectedUser.username))
                        data
                            .filter(item => item.username === selectedUser)
                            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                            .map((item, index) => {
                                return (
                                    <Accordion>
                                        <Card key={index}>
                                            <Card.Header>
                                                <Accordion.Toggle as={Card.Header} variant="link" eventKey={index + 1} style={{ backgroundColor: "#cbc0d3" }}>
                                                    <span style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <span>{index + 1}</span>
                                                        <span>User : {item.username}</span>
                                                        <span><p onClick={(e) => { handlePaymentCon(e) }}>Invoice: {item.order_number}</p></span>
                                                        <span>Date: {item.date}</span>
                                                        <span>Payment Method: {item.payment_method}</span>
                                                        <span>Status: {item.status}</span>
                                                        <span>Total Belanja :{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'IDR' }).format(item.total_belanja)}</span>
                                                    </span>
                                                </Accordion.Toggle>
                                                {item.status === "Canceled"
                                                    ?
                                                    <i style={{ color: "blue" }}>{item.message}</i>   
                                                    :
                                                    item.payment_confirmation === 0
                                                        ?
                                                        <i style={{ color: "blue" }}>Waiting for user payment</i>
                                                        :
                                                        item.status !== "Paid"
                                                            ?
                                                            item.status === "On Delivery"
                                                                ?
                                                                <i style={{ color: "blue" }}>Waiting for item arrival confirmation</i>
                                                                :
                                                                <i style={{ color: "blue" }}>{item.message}</i>
                                                            :
                                                            <>
                                                            <Button style={{ marginRight: '5px' }} onClick={() => handlePaymentCon(item.order_number)}> Confirm Payment </Button>
                                                            <Button className="btn btn-danger" style={{ marginRight: '5px' }} onClick={() => handleCancelOrder(item.order_number)}> Cancel Order </Button>
                                                            </>
                                                }
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={index + 1}>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Name</th>
                                                            <th>Image</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {item.products.map((item2, index2) => {
                                                            return (
                                                                <tr>
                                                                    <td>{index2 + 1}</td>
                                                                    <td>{item2.name}</td>
                                                                    <td>
                                                                        <Image src={item2.image} style={{ height: 100, width: 100 }} rounded />
                                                                    </td>
                                                                    <td>{item2.quantity}</td>
                                                                    <td>IDR {item2.price.toLocaleString()}</td>
                                                                    <td>IDR {item2.total.toLocaleString()}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                )
                            })
                        :
                        data
                            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                            .map((item, index) => {
                                return (
                                    <Accordion>
                                        <Card key={index}>
                                            <Card.Header>
                                                <Accordion.Toggle as={Card.Header} variant="link" eventKey={index + 1} style={{ backgroundColor: "#cbc0d3" }}>
                                                    <span style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <span>{index + 1}</span>
                                                        <span>User : {item.username}</span>
                                                        <span><p onClick={(e) => { handlePaymentCon(e) }}>Invoice: {item.order_number}</p></span>
                                                        <span>Date: {item.date}</span>
                                                        <span>Payment Method: {item.payment_method}</span>
                                                        <span>Status: {item.status}</span>
                                                        <span>Total Belanja :{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'IDR' }).format(item.total_belanja)}</span>
                                                    </span>
                                                </Accordion.Toggle>
                                                {item.status === "Canceled"
                                                    ?
                                                    <i style={{ color: "blue" }}>{item.message}</i>   
                                                    :
                                                    item.payment_confirmation === 0
                                                        ?
                                                        <i style={{ color: "blue" }}>Waiting for user payment</i>
                                                        :
                                                        item.status !== "Paid"
                                                            ?
                                                            item.status === "On Delivery"
                                                                ?
                                                                <i style={{ color: "blue" }}>Waiting for item arrival confirmation</i>
                                                                :
                                                                <i style={{ color: "blue" }}>{item.message}</i>
                                                            :
                                                            <>
                                                            <Button style={{ marginRight: '5px' }} onClick={() => handlePaymentCon(item.order_number)}> Confirm Payment </Button>
                                                            <Button className="btn btn-danger" style={{ marginRight: '5px' }} onClick={() => handleCancelOrder(item.order_number)}> Cancel Order </Button>
                                                            </>
                                                }
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={index + 1}>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Name</th>
                                                            <th>Image</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {item.products.map((item2, index2) => {
                                                            return (
                                                                <tr>
                                                                    <td>{index2 + 1}</td>
                                                                    <td>{item2.name}</td>
                                                                    <td>
                                                                        <Image src={item2.image} style={{ height: 100, width: 100 }} rounded />
                                                                    </td>
                                                                    <td>{item2.quantity}</td>
                                                                    <td>IDR {item2.price.toLocaleString()}</td>
                                                                    <td>IDR {item2.total.toLocaleString()}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                )
                            })
                    }
                </Table>
                <Modal show={alert} onHide={() => setAlert(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please insert the cancellation reason</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fas fa-comment-dots"></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                ref={Message}
                                placeholder="Input the reason for cancellation"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" data-dismiss="modal" onClick={() => handleCancelMessage()}>
                            Okay
                            </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div >
    )
}

const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        justityContent: "space-between",
    },
    card: {
        width: "16.5rem",
        margin: "10px",
    }
}

export default OrderListing