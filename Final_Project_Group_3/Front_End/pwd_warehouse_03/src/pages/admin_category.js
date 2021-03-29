import React from 'react'
import Axios from 'axios'

import { useDispatch } from 'react-redux'
import { Table, Button, Form, Toast, Alert, Pagination } from 'react-bootstrap'
import {
    editCategory,
    deleteCategory,
    addCategory
} from '../actions';

const GetCategory = () => {
    const [data, setData] = React.useState([])
    const [editIndex, setEditIndex] = React.useState(null)
    const [cate, setCate] = React.useState('')
    const [input, setInput] = React.useState('')
    const [addSuccess, setAddSuccess] = React.useState(false)
    const [addError, setAddError] = React.useState(false)

    const dispatch = useDispatch();

    React.useEffect(() => {
        Axios.get(`http://localhost:2000/admin/getcategory`)
            .then(res => (setData(res.data)))
            .catch(err => console.log(err))
    }, [data])

    const deleteHandler = (itemId) => {
        const input = {
            id: itemId
        }
        dispatch(deleteCategory(input))
        console.log(input)
    }

    const saveHandler = (itemId) => {
        if (!cate) return setAddError(true)
        const input = {
            id: itemId,
            category: cate
        }
        dispatch(editCategory(input))
        setEditIndex(null)
        setCate('')
        console.log(input)
    }

    const changeCate = (e) => {
        const input = e.target.value
        setCate(input)
    }

    const addHandler = () => {
        if (!input) return setAddError(true)
        const newInput = {
            category: input
        }
        dispatch(addCategory(newInput))
        setAddSuccess(true)
        setInput('')
        console.log(newInput)
    }

    const changeInput = (e) => {
        const input = e.target.value
        setInput(input)
    }

    const handleClose = () => setAddSuccess(false)

    const itemsPerPage = 5
    const [page, setPage] = React.useState(1)
    const noOfPages = Math.ceil(data.length / itemsPerPage)
    const listItem = Array(noOfPages).fill(1)

    const renderTable = () => {
        return data
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((item, index) => {
            return (
                index === editIndex
                    ?
                    <tr key={index}>
                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                        <td style={{ textAlign: 'right' }}>
                            <Form.Control style={{ width: '300px', fontSize: '20px' }} onChange={(e) => changeCate(e)} value={cate} placeholder={item.category} />
                        </td>
                        <td style={{ textAlign: 'center' }}>{item.id}</td>
                        <td style={{ textAlign: 'center' }}>
                            <Button variant="outline-success" style={{ marginRight: '5px' }} onClick={() => saveHandler(item.id)}> ✔ </Button>
                            <Button variant="outline-danger" style={{ marginLeft: '5px' }} onClick={() => setEditIndex(null)}> ❌ </Button>
                        </td>
                    </tr>
                    :
                    <tr key={index}>
                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                        <td>{item.category}</td>
                        <td style={{ textAlign: 'center' }}>{item.id}</td>
                        <td style={{ textAlign: 'center' }}>
                            <Button variant="warning" style={{ marginRight: '5px' }} onClick={() => setEditIndex(index)}> Edit </Button>
                            <Button variant="danger" style={{ marginLeft: '5px' }} onClick={() => deleteHandler(item.id)}> Delete </Button>
                        </td>
                    </tr>
            )
        })
    }
    return (
        <div style={{ marginTop: "138px" }}>
            <Alert style={{
                position: 'absolute',
                top: 0,
                left: 0,
                marginTop:'120px'
            }} show={addError} variant="danger" onClose={() => setAddError(false)} dismissible>
                Input tidak boleh kosong
            </Alert>
            <Toast style={{
                position: 'absolute',
                top: 0,
                left: 0,
                marginTop:'120px'
            }} show={addSuccess} onClose={handleClose}>
                <Toast.Header>
                    <strong className="mr-auto">Electronic Shop</strong>
                </Toast.Header>
                <Toast.Body>Add category success</Toast.Body>
            </Toast>
            <div style={{ display: 'flex', marginBottom: '30px', marginRight: '20px', justifyContent: 'flex-end' }}>
                <Form.Control style={{ width: '400px', fontSize: '20px', marginRight: '10px' }} onChange={(e) => changeInput(e)} value={input} placeholder='input category' />
                <Button variant="outline-primary" onClick={() => addHandler()}><i class="far fa-plus-octagon"></i></Button>
            </div>
            <Table striped bordered hover variant="dark">
                <thead style={{ backgroundColor: '#2f3640', textAlign: 'center' }}>
                    <tr style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <th>No</th>
                        <th>Category</th>
                        <th>ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
            </Table>
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
    )
}

export default GetCategory