import React from 'react'
import Axios from 'axios'
import { getProductStock } from '../actions'
import { useSelector, useDispatch } from 'react-redux'
import {
    Table,
    Button,
    Pagination,
    Modal,
    Form,
    Dropdown
} from 'react-bootstrap'

const SalesReport = () => {
    const dispatch = useDispatch()

    let [data, setData] = React.useState([])
    const [selectedOption, setSelectedOption] = React.useState("")



    React.useEffect(() => {
        async function fetchData() {
            try {
                let res = await Axios.get(`http://localhost:2000/cart/order_listing`)
                setData(res.data)
            }
            catch (err) {
                console.log(err)
            }

        }
        fetchData()
    }, [])

    console.log(data)

    const options = [
        'Produk Terlaris',
        'Total Belanja Tertinggi',
        'Total Belanja Terendah',
    ]

    const handleClickListItem = (index) => {
        const input = options[index]
        setSelectedOption(input)

        if (index === 0) return data.sort((a, b) => b.total - a.total) // NOTE kurang product terlaris
        if (index === 1) return data.sort((a, b) => b.total - a.total)
        if (index === 2) return data.sort((a, b) => a.total - b.total)
    }
    // pagination
    const itemsPerPage = 5
    const [page, setPage] = React.useState(1)
    const noOfPages = Math.ceil(data.length / itemsPerPage)
    const listItem = Array(noOfPages).fill(1)
    

    const renderTable = () => {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Order Number</th>
                        <th>Product Name</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data
                            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                            .map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.order_number}</td>
                                        <td>{item.name}</td>
                                        <td>{item.payment_method}</td>
                                        <td>{item.status}</td>
                                        <td>{item.quantity}</td>
                                        <td>{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'IDR' }).format(item.price)}</td>
                                        <td>{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'IDR' }).format(item.total)}</td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </Table>
        )
    }

    return (
        <div>
            {
                data.length !== 0
                    ?
                    <div style={{ marginTop: '110px', padding: 30 }}>
                        <h1>SALES REPORT <i className="far fa-chart-bar" syle={{ marginRight: '15px' }}></i></h1>
                        <div style={{ display: 'flex', flexDirection: 'row', width: "100vw" }}>
                            <Pagination>
                                <Pagination.Prev disabled={page <= 1 ? true : false} onClick={() => setPage(page - 1)} />
                                {listItem.map((item, index) => {
                                    return (
                                        <Pagination.Item key={index} active={index + 1 === page} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
                                    )
                                })}
                                <Pagination.Next disabled={page >= noOfPages ? true : false} onClick={() => setPage(page + 1)} />
                            </Pagination>
                            <h3 style={{ marginRight: 10, marginLeft: "67vw" }}>Sort By</h3>
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
                        {renderTable()}
                    </div>
                    :
                    <div></div>
            }
        </div>
    )
}

export default SalesReport