import React, { useState, useRef } from 'react'
import {
    Button,
    InputGroup,
    FormControl,
    Modal,
} from 'react-bootstrap'

// import action untuk login dan logout
import { login, logout } from '../actions'

// import connect redux
import { useDispatch, useSelector } from "react-redux"

// import redirect from react router-dom
import { Redirect, Link } from "react-router-dom"

function Login() {
    let usernameRef = useRef('')
    let passwordRef = useRef('')
    let renderCount = useRef(1)
    renderCount.current = renderCount.current + 1

    let [visible, setVisible] = useState(false)

    const dispatch = useDispatch()

    const { username, msgError } = useSelector((state) => {
        return {
            username: state.user.username,
            msgError: state.user.errLogin
        }
    })

    function handleLogin(x) {
        let username = `${usernameRef.current.value.includes("@") ? "" : usernameRef.current.value}`
        let email = `${usernameRef.current.value.includes("@") ? usernameRef.current.value : ""}`
        let password = passwordRef.current.value
        console.log(username, email, password)

        const body = {
            username,
            email,
            password,
        }
        dispatch(login(body))
    }
    if (username) return <Redirect to='/' />
    console.log(usernameRef.current.value)
    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <h1 style={{ display: "flex", justifyContent: "center" }}>Login</h1>
                <p>Username / Email</p>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                            <i className="fas fa-user"></i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={usernameRef}
                        placeholder="Username / Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <p>Password</p>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend style={{ cursor: 'pointer', width: '40px' }}
                        onClick={() => setVisible(!visible)}>
                        <InputGroup.Text id="basic-addon1">
                            <i className={visible ?  "fas fa-eye" : "fas fa-eye-slash" }></i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={passwordRef}
                        placeholder="password"
                        aria-label="password"
                        type={visible ? "text" : "password"}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <div style={{ display: "flex", justifyContent: "center", }}>
                    <Button onClick={handleLogin} variant='primary' style={{ marginTop: "10px", }}>Login</Button>
                </div>
                <p style={{ marginTop: "10px" }}>Do you have an account? <Link to='/register' style={{color: '#03045e'}}>Register Here</Link></p>
                <p>Forgot password ? <Link to='/requestNewPassword' style={{color: '#03045e'}}>Click Here</Link></p>
                <Modal show={Boolean(msgError)} onHide={() => dispatch(logout())}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{msgError}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={() => dispatch(logout())}>
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

const styles = {
    container: {
        width: '400px',
        background: 'rgba(82, 192, 192, 0.8)',
        padding: '10px',
        borderRadius: '15px',
        marginTop: '90px',
        height: '400px',
    },
    item: {
        margin: '15px 0'
    },
    background: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        background: "url(https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80) no-repeat center",
        backgroundSize: '100vw 100vh',
        marginTop: '108px'
    }
}


export default Login