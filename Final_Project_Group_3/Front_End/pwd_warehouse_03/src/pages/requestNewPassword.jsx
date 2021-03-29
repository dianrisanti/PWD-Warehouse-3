import React from 'react'
import Axios from 'axios'
import {
    Redirect,
    Link
} from 'react-router-dom'
import {
    Button,
    InputGroup,
    Form,
    FormControl,
    Modal
} from 'react-bootstrap'

import { useSelector } from 'react-redux'

function RequestNewPassword(props) {
    const { status } = useSelector((state) => {
        return {
            status: state.user.regStatus
        }
    })

    // NOTE alert error message to user
    let [regError, setRegError] = React.useState([false, ""])
    let [confirmEmail, setConfirmEmail] = React.useState([false, ""])
    let [emailValidErr, setEmailValidErr] = React.useState([false, ""])


    let emailRef = React.useRef('')

    function handleRequestPassword() {
        let email = emailRef.current.value
        async function fetchData() {

            try {
                let res = await Axios.post('http://localhost:2000/user/forgotpassword', { email })
                console.log(res.data)
                setConfirmEmail([true, "Link for request new password has been sent to your email"])
            }
            catch (err) {
                console.log(err.response.data)
                const errMsg = err.response.data
                setRegError([true, errMsg])
            }
        }
        fetchData()
    }

    function emailValid(e) {
        let email = e.target.value
        // console.log(email)
        let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.test(email)) return setEmailValidErr([true, "*Email not valid"])

        setEmailValidErr([false, ""])
    }


    return (
        <div style={styles.container}>
            <div style={styles.center}>
                <div style={{marginTop: "40px"}}>
                    <h1>Forgot Password</h1>
                </div>
                <div style={{ ...styles.item, textAlign: 'center' }}>
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
                    <Button onClick={handleRequestPassword}>
                        Confirm
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
                <Modal show={confirmEmail[0]} onHide={() => setConfirmEmail([false, ""])}>
                    <Modal.Header closeButton>
                        <Modal.Title>Request New Password Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{confirmEmail[1]}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => setConfirmEmail([false, ""])}>
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
        background: "url(https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2134&q=80) no-repeat center",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        marginTop: "108px"
    },
    center: {
        marginTop: 150,
        padding: "10px 30px",
        width: 450,
        height: "40vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid gray",
        borderRadius: "30px",
        backgroundColor: "rgba(255, 255, 255, .85)"
    },
    item: {
        width: "100%",
        height: "100%",
        marginBottom: 15,
    }
}


export default RequestNewPassword