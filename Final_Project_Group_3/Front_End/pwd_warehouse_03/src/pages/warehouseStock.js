import React from 'react'
import Axios from 'axios'
import { getProductStock } from '../actions'
import { useSelector, useDispatch } from 'react-redux'
import {
    Table,
    Button,
    Pagination,
    Modal,
    Form
} from 'react-bootstrap'

const WarehouseStock = () => {
    const [modal, setModal] = React.useState(false)
    const [stockProdId, setStockProdId] = React.useState(null)
    const [stockJkt, setStockJkt] = React.useState(null)
    const [bookedJkt, setBookedJkt] = React.useState(null)
    const [availableJkt, setAvailableJkt] = React.useState(null)
    const [stockMedan, setStockMedan] = React.useState(null)
    const [bookedMedan, setBookedMedan] = React.useState(null)
    const [availableMedan, setAvailableMedan] = React.useState(null)
    const [stockSurabaya, setStockSurabaya] = React.useState(null)
    const [bookedSurabaya, setBookedSurabaya] = React.useState(null)
    const [availableSurabaya, setAvailableSurabaya] = React.useState(null)
    const [stockProdName, setStockProdName] = React.useState("")
    const [stockProdTotal, setStockProdTotal] = React.useState(0)
    const [qtyErr, setQtyErr] = React.useState([false, ""])

    const dispatch = useDispatch()
    const { data } = useSelector((state) => {
        return{
            data: state.admin.productStock
        }
    })

    React.useEffect(() => {
        dispatch(getProductStock())
    }, [])
    
    // pagination
    const itemsPerPage = 30
    const [page, setPage] = React.useState(1)
    const noOfPages = Math.ceil(data.length / itemsPerPage)
    const listItem = Array(noOfPages).fill(1)

    const sendStockHandler = (i, name) => {
        setStockProdId(i)
        setStockProdName(name)
        
        const filtered = data.filter(item => item.id === i)

        for(const entry of filtered) {
            if(entry.location === "Jakarta") {
                setBookedJkt(entry.booked) 
                setAvailableJkt(entry.available)
                setStockJkt(entry.stock)
            }
            if(entry.location === "Medan") {
                setBookedMedan(entry.booked)
                setAvailableMedan(entry.available)
                setStockMedan(entry.stock)
            }
            if(entry.location === "Surabaya") {
                setBookedSurabaya(entry.booked)
                setAvailableSurabaya(entry.available)
                setStockSurabaya(entry.stock)
            }
        }

        const sum = filtered.reduce((a, b) => a + b.stock, 0)
        setStockProdTotal(sum)
        setModal(true)
    }

    const changeQtyJkt = (e) => {
        const input = e.target.value
        if(isNaN(+input)) return 
        setStockJkt(+input)
    }

    const changeQtyMedan = (e) => {
        const input = e.target.value
        if(isNaN(+input)) return 
        setStockMedan(+input)
    }

    const changeQtySurabaya = (e) => {
        const input = e.target.value
        if(isNaN(+input)) return 
        setStockSurabaya(+input)
    }

    const saveHandler = () => {
        if(stockJkt < bookedJkt || stockMedan < bookedMedan || stockSurabaya < bookedSurabaya) return setQtyErr([true, `Stock kurang dari booked`])
        if(stockJkt + stockMedan + stockSurabaya !== stockProdTotal) return setQtyErr([true, `Jumlah tidak sesuai total`])
        const input = {
            id_product: stockProdId,
            warehouse: [
                {location: "Jakarta", stock: stockJkt},
                {location: "Medan", stock: stockMedan},
                {location: "Surabaya", stock: stockSurabaya}
            ]
        }

        async function fetchData() {
            try {
                await Axios.post('http://localhost:2000/admin/editstock', input)
                
                dispatch(getProductStock())
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()

        setQtyErr([false, ""])
        setModal(false)
    }

    const renderTable = () => {
        return(
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Product Name</th>
                        <th>Warehouse Location</th>
                        <th>Booked</th>
                        <th>Available</th>
                        <th>Total Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((item, index) => {
                            return(
                                <tr>
                                    <td>{item.id_warehouse}</td>
                                    <td>{item.name}</td>
                                    <td>{item.location}</td>
                                    <td>{item.booked}</td>
                                    <td>{item.available}</td>
                                    <td>{item.stock}</td>
                                    <td>
                                        <Button onClick={() => sendStockHandler(item.id, item.name)}>
                                            Send stock
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        )
    }

    const renderTableDetail = () => {
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Lokasi</th>
                    <th>Booked</th>
                    <th>Available</th>
                    <th>Total Stock</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Jakarta</td>
                    <td>{bookedJkt}</td>
                    <td>{availableJkt}</td>
                    <td>
                        <Form.Control style={{width: '70px', fontSize: '15px', height: '30px'}} onChange={(e) => changeQtyJkt(e)} value={stockJkt} min={0}/>
                    </td>
                </tr>
                <tr>
                    <td>Medan</td>
                    <td>{bookedMedan}</td>
                    <td>{availableMedan}</td>
                    <td>
                        <Form.Control style={{width: '70px', fontSize: '15px', height: '30px'}} onChange={(e) => changeQtyMedan(e)} value={stockMedan} min={0}/>
                    </td>
                </tr>
                <tr>
                    <td>Surabaya</td>
                    <td>{bookedSurabaya}</td>
                    <td>{availableSurabaya}</td>
                    <td>
                        <Form.Control style={{width: '70px', fontSize: '15px', height: '30px'}} onChange={(e) => changeQtySurabaya(e)} value={stockSurabaya} min={0}/>
                    </td>
                </tr>
            </tbody>
        </Table>
    }

    const renderModal = () => {
        return(
            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{stockProdName}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div style={{display: 'flex'}}>
                        <p>Total Stock Semua Gudang: </p>
                        <p style={{marginLeft: '15px'}}>{stockProdTotal}</p>
                    </div>

                    <div style={{width: '400px'}}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Lokasi</th>
                                <th>Booked</th>
                                <th>Available</th>
                                <th>Total Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Jakarta</td>
                                <td>{bookedJkt}</td>
                                <td>{availableJkt}</td>
                                <td>
                                    <Form.Control style={{width: '70px', fontSize: '15px', height: '30px'}} onChange={(e) => changeQtyJkt(e)} value={stockJkt} min={0}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Medan</td>
                                <td>{bookedMedan}</td>
                                <td>{availableMedan}</td>
                                    <td>
                                        <Form.Control style={{width: '70px', fontSize: '15px', height: '30px'}} onChange={(e) => changeQtyMedan(e)} value={stockMedan} min={0}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Surabaya</td>
                                    <td>{bookedSurabaya}</td>
                                    <td>{availableSurabaya}</td>
                                    <td>
                                        <Form.Control style={{width: '70px', fontSize: '15px', height: '30px'}} onChange={(e) => changeQtySurabaya(e)} value={stockSurabaya} min={0}/>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <p style={{fontSize: '14px', color: 'red'}}>{qtyErr[0] ? qtyErr[1] : "" }</p>
                </Modal.Body>
                        
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return(
        <div>
            {
                data.length !== 0
                ?
                <div style={{marginTop: '110px', padding: 30}}>
                    {renderTable()}
                    <Pagination>
                        <Pagination.Prev disabled={page <= 1 ? true : false} onClick={() => setPage(page - 1)} />
                        {listItem.map((item, index) => {
                            return (
                                <Pagination.Item key={index} active={index+1 === page} onClick={() => setPage(index+1)}>{index+1}</Pagination.Item>
                            )
                        })}
                        <Pagination.Next disabled={page >= noOfPages ? true : false} onClick={() => setPage(page + 1)} />
                    </Pagination>
                    
                    {
                        stockProdId
                        ?
                        <div>
                            {renderModal()}
                        </div>
                        :
                        <div></div>
                    }
                    
                </div>
                :
                <div></div>
            }
        </div>
    )
}

export default WarehouseStock