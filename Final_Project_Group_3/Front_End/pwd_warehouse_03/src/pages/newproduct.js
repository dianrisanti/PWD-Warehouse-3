import React from 'react'

import { Button, Form, Modal } from 'react-bootstrap'

import { Link } from 'react-router-dom'


import {
    AddProduct
} from '../actions';

import { useDispatch } from 'react-redux'


const NewProduct = () => {
    const [name, setName] = React.useState('')
    const [image, setImage] = React.useState('')
    const [cate, setCate] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [addError, setAddError] = React.useState(false)
    const [addSuccess, setAddSuccess] = React.useState(false)

    const dispatch = useDispatch()

    const changeName = (e) => {
        const input = e.target.value
        setName(input)
    }

    const changeImage = (e) => {
        const input = e.target.value
        setImage(input)
    }

    const changeCate = (e) => {
        const input = e.target.value
        setCate(input)
    }

    const changePrice = (e) => {
        const input = e.target.value
        setPrice(input)
    }

    const changeDesciption = (e) => {
        const input = e.target.value
        setDescription(input)
    }

    const addHandler = () => {
        if (!name || !image || !cate || !price || !description) return setAddError(true)
        const input = {
            name,
            image,
            cate,
            price,
            description
        }
        dispatch(AddProduct(input))
        // setAddSuccess(true)
        setName('')
        setImage('')
        setCate('')
        setPrice('')
        setDescription('')
        setAddSuccess(true)
        setAddError(false)
        console.log(input)
    }

    const handleClose = () => setAddSuccess(false)
    const handleClose2 = () => setAddError(false)

    return (
        <div style={{ width: '100vw', background: 'black' }}>
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    marginTop: '80px',
                    height: '500px',
                    width: '900px',
                    background: 'linear-gradient(315deg,#4dff03,#00d0ff)',
                    textAlign: 'center',
                    borderRadius: '5px',
                    boxShadow: '0 5px 15px black',
                    borderTop: '1px solid grey',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{
                        height: '500px',
                        width: '900px',
                        background: 'linear-gradient(315deg,#4dff03,#00d0ff)',
                        textAlign: 'center',
                        borderRadius: '5px',
                        boxShadow: '0 5px 15px black',
                        borderTop: '1px solid grey',
                        filter: 'blur(30px)'
                    }}>
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: '6px',
                        left: '6px',
                        right: '6px',
                        bottom: '6px',
                        background: 'rgba(0,0,0,0.6)',
                        zIndex: 2
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            width: '50%',
                            height: '100%',
                            background: 'rgba(225,225,2255,0.1)'
                        }}>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                            <div style={{ flexGrow: '4' }}>
                                <strong style={{ color: 'white', marginTop: '15px', fontSize: '60px', fontFamily: 'Roboto, sans-serif' }}>NEW PRODUCT</strong>
                            </div>
                            <div style={{ flexGrow: '6', paddingLeft: '25px', paddingRight: '25px', fontFamily: 'Playfair Display, serif' }}>
                                <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <h2>Product Name : </h2><Form.Control style={{ width: '500px', fontSize: '20px' }} onChange={(e) => changeName(e)} value={name} />
                                </div>
                                <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <h2>Image Source : </h2><Form.Control style={{ width: '500px', fontSize: '20px' }} onChange={(e) => changeImage(e)} value={image} />
                                </div>
                                <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <h2>Category ID : </h2><Form.Control style={{ width: '500px', fontSize: '20px' }} onChange={(e) => changeCate(e)} value={cate} />
                                </div>
                                <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <h2>Product Price : </h2><Form.Control style={{ width: '500px', fontSize: '20px' }} onChange={(e) => changePrice(e)} value={price} />
                                </div>
                                <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <h2>Product Description : </h2><Form.Control style={{ width: '500px', fontSize: '20px' }} onChange={(e) => changeDesciption(e)} value={description} />
                                </div>
                            </div>
                            <div style={{ flexGrow: '2' }}>
                                <Button variant='outline-light' style={{ fontSize: '22px', marginBottom: '10px', width: '100px', fontFamily: 'Lobster, cursive' }} onClick={() => addHandler()}>Add</Button>
                            </div>
                            <Modal show={addSuccess} onHide={handleClose} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title style={{color: 'green'}}>SUCCESS</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{color: 'green'}}>Berhasil menambahkan produk baru</Modal.Body>
                                <Modal.Footer>
                                    <Button variant='outline-success' as={Link} to='./'>
                                        Produk
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={addError} onHide={handleClose2} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title style={{color: 'red'}}>ERROR</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{color: 'red'}}>Pastikan input tidak kosong !</Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct