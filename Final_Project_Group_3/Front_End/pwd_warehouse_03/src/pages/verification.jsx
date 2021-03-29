import React, { useEffect } from 'react'
import Axios from 'axios'
import {
    Button
} from 'react-bootstrap'
import {
    Link,
    Redirect
} from 'react-router-dom'

import { verification } from '../actions'
import { useSelector, useDispatch } from 'react-redux'

function Verification(props) {
    console.log(props)
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchData() {

            // NOTE get token from query url
            let token = props.location.search.substring(1)

            try {
                let res = await Axios.post('http://localhost:2000/user/verification', { token })
                console.log(res.data)
                dispatch(verification())
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const { status, id } = useSelector((state) => {
        return {
            status: state.user.regStatus,
            id: state.user.id_user
        }
    })

    console.log(status)
    if (!id) return <Redirect to='/' />
    return (
        <div style={styles.container}>
            <div style={styles.center}>
                {
                    parseInt(status) === 1
                        ?
                        <>
                            <h3 style={{marginTop: 10, textAlign: "center"}}> Your account has been verified</h3>
            <Button as={Link} to='/' style={{marginTop: 10}}>
                                    Go To Home
            </Button>
                        </>
                        :
                        <h3 style={{marginTop: 10, textAlign: "center"}}>'Waiting for account verification'</h3>
                }
            </div>
        </div>
    )
}

const styles = {
    container: {
        background: "url(https://images.unsplash.com/photo-1608560610603-c7ebd7b0fc05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80) no-repeat center",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        marginTop: "108px"
    },
    center: {
        marginTop: 200,
        padding: "10px 30px",
        width: 350,
        height: "28vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid gray",
        borderRadius: "30px",
        backgroundColor: "rgba(255, 255, 255, .7)"
    }
}

export default Verification