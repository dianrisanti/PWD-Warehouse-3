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

function ForgotPassword(props) {
    console.log(props)
    
    const { status } = useSelector((state) => {
        return {
            status: state.user.regStatus
        }
    })
    
    let [visible1, setVisible1] = React.useState(false)
    let [visible2, setVisible2] = React.useState(false)
    let [passValidErr, setPassValidErr] = React.useState([false, ""])
    let [regError, setRegError] = React.useState([false, ""])
    let [toLogin, setToLogin] = React.useState(false)
    
    React.useEffect(() => {
        async function fetchData() {

            // NOTE get token from query url
            let token = props.location.search.substring(1)

            try {
                let res = await Axios.post('http://localhost:2000/user/verification', { token })
                console.log(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])


    let passwordRef = React.useRef('')
    let confpassRef = React.useRef('')


    function handleRegister() {
        let password = passwordRef.current.value
        let confpass = confpassRef.current.value
        let id = props.location.search.substring(1)
        console.log(id)

        if (confpass !== password) return setRegError([true, "Password doesn't match with Confirm Password"])

        if (passValidErr[0]) return setRegError([true, "Make sure there is no error in validation"])

        // axios post untuk mengirim data ke api
        Axios.post(`http://localhost:2000/user/edit_password/${id}`, { password })
            .then((res) => {
                setRegError([false, ''])
                setToLogin(true)
            })
            .catch(err => {
                console.log(err)
                setRegError([true, err.response.data])
            })
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
                {
                    parseInt(status) === 1
                        ?
                        <>
                            <h3 style={{ marginTop: 50, textAlign: "center" }}> Your account has been verified</h3>
                            <Button as={Link} to='/' style={{ marginTop: 10 }}>
                                Go To Home
            </Button>
                        </>
                        :


                        <div>
                            <div style={{marginTop:"6px"}}>
                                <h1>Forgot Password</h1>
                            </div>
                            <div style={{ ...styles.item, textAlign: 'center' }}>
                                <InputGroup>
                                    <InputGroup.Prepend style={{ cursor: 'pointer' }}
                                        onClick={() => setVisible1(!visible1)}>
                                        <InputGroup.Text id="basic-addon1" style={{ width: "45px", display: 'flex', justifyContent: 'center' }}>
                                            <i className={visible1 ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="New Password"
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
                                        placeholder="Confirm New Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        style={{ height: "45px" }}
                                        type={visible2 ? "text" : "password"}
                                        ref={confpassRef}
                                    />
                                </InputGroup>
                                <Form.Text className="mb-3" style={{ textAlign: "left", color: "red", fontSize: '10px' }}>
                                    {passValidErr[1]}
                                </Form.Text>
                                <Button onClick={handleRegister}>
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
                        </div>
                }
            </div>
        </div>
    )
}

const styles = {
    container: {
        background: "url(https://images.unsplash.com/photo-1606245896050-dbeb5c0c4656?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80) no-repeat center",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        marginTop: "108px"
    },
    center: {
        marginTop: 100,
        padding: "10px 30px",
        width: 430,
        height: "40vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid gray",
        borderRadius: "30px",
        backgroundColor: "rgba(255, 255, 255, .7)"
    },
    item: {
        width: "100%",
        height: "auto",
        marginBottom: 15,
    }
}


export default ForgotPassword