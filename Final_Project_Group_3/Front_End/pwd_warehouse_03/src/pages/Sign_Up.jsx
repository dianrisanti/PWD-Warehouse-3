import React from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import {
    Button,
    InputGroup,
    Form,
    FormControl,
    Modal
} from 'react-bootstrap'

function RegisterPage() {

    let [visible1, setVisible1] = React.useState(false)
    let [visible2, setVisible2] = React.useState(false)
    let [userValidErr, setUserValidErr] = React.useState([false, ""])
    let [emailValidErr, setEmailValidErr] = React.useState([false, ""])
    let [passValidErr, setPassValidErr] = React.useState([false, ""])
    let [regError, setRegError] = React.useState([false, ""])
    let [toLogin, setToLogin] = React.useState(false)


    let usernameRef = React.useRef('')
    let emailRef = React.useRef('')
    let passwordRef = React.useRef('')
    let confpassRef = React.useRef('')


    function handleRegister() {

        let username = usernameRef.current.value
        let email = emailRef.current.value
        let password = passwordRef.current.value
        let confpass = confpassRef.current.value
        // console.log(username, email, password, confpass)

        if (!username || !email || !password || !confpass) return setRegError([true, "Please input all form"])

        if (confpass !== password) return setRegError([true, "Password doesn't match with Confirm Password"])

        if (userValidErr[0] || emailValidErr[0] || passValidErr[0]) return setRegError([true, "Make sure there is no error in validation"])

        // axios post untuk mengirim data ke api
        Axios.post('http://localhost:2000/user/register', { username, password, email })
            .then((res) => {
                setRegError([false, ''])
                setToLogin(true)
            })
            .catch(err => {
                console.log(err.response.data)
                const errMsg = err.response.data
                setRegError([true, errMsg])
            })
    }

    function userValid(e) {
        // console.log(e)
        let username = e.target.value
        // console.log(username)
        let symb = /[!@#$%^&*;]/

        if (symb.test(username) || username.length < 6) return setUserValidErr([true, "*Can't include symbol and min 6 char"])

        setUserValidErr([false, ""])
    }

    function emailValid(e) {
        let email = e.target.value
        // console.log(email)
        let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.test(email)) return setEmailValidErr([true, "*Email not valid"])

        setEmailValidErr([false, ""])
    }

    function passValid(e) {
        // char min 6
        // ada symbol
        // ada angka
        let pass = e.target.value
        // console.log(pass)
        let symb = /[!@#$%^&*:]/
        let numb = /[0-9]/
        // let upper = /[A-Z]/

        if (!symb.test(pass) || !numb.test(pass) || pass.length < 6) return setPassValidErr([true, "*Must include symbol, number, min 6 char"])

        setPassValidErr([false, ""])
    }

    if (toLogin) return <Redirect to='/login' />

    return (
        <div style={styles.container}>
            <div style={styles.center}>
                <div>
                    <h1>Register</h1>
                </div>
                <div style={{ ...styles.item, textAlign: 'center' }}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1" style={{ width: "45px", display: 'flex', justifyContent: 'center' }}>
                                <i className="fas fa-user-circle"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            style={{ height: "45px" }}
                            ref={usernameRef}
                            onChange={(e) => userValid(e)}
                        />
                    </InputGroup>
                    <Form.Text className="mb-3" style={{ textAlign: "left", color: "red", fontSize: '10px' }}>
                        {userValidErr[1]}
                    </Form.Text>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1" style={{ width: "45px", display: 'flex', justifyContent: 'center' }}>
                                <i className="fas fa-envelope" />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            style={{ height: "45px" }}
                            ref={emailRef}
                            onChange={(e) => emailValid(e)}
                        />
                    </InputGroup>
                    <Form.Text className="mb-3" style={{ textAlign: "left", color: "red", fontSize: '10px' }}>
                        {emailValidErr[1]}
                    </Form.Text>
                    <InputGroup>
                        <InputGroup.Prepend style={{ cursor: 'pointer' }}
                            onClick={() => setVisible1(!visible1)}>
                            <InputGroup.Text id="basic-addon1" style={{ width: "45px", display: 'flex', justifyContent: 'center' }}>
                                <i className={visible1 ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            style={{ height: "45px" }}
                            type={visible1 ? "text" : "password"}
                            ref={passwordRef}
                            onChange={(e) => passValid(e)}
                        />
                    </InputGroup>
                    <Form.Text className="mb-3" style={{ textAlign: "left", color: "red", fontSize: '10px' }}>
                        {passValidErr[1]}
                    </Form.Text>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend style={{ cursor: 'pointer' }}
                            onClick={() => setVisible2(!visible2)}>
                            <InputGroup.Text id="basic-addon1" style={{ width: "45px", display: 'flex', justifyContent: 'center' }}>
                                <i className={visible2 ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Confirm Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            style={{ height: "45px" }}
                            type={visible2 ? "text" : "password"}
                            ref={confpassRef}
                        />
                    </InputGroup>
                    <Button onClick={handleRegister}>
                        Register <i className="fas fa-user-plus" style={{ marginLeft: '10px' }}></i>
                    </Button>
                </div>
                <Modal show={regError[0]} onHide={() => setRegError([false, ""])}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{regError[1]}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setRegError([false, ""])}>
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
        background: "url(https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80) no-repeat center",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        marginTop: '108px'
    },
    center: {
        marginTop: 70,
        padding: "10px 30px",
        width: 350,
        height: "68vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid gray",
        borderRadius: "30px",
        backgroundColor: "rgba(255, 255, 255, .8)"
    },
    item: {
        width: "100%",
        height: "auto",
        marginBottom: 15,
    }
}

export default RegisterPage