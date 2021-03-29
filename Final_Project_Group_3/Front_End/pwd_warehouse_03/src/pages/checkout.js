import React from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    Image,
    Form,
    Button,
    Modal
} from 'react-bootstrap'

const Checkout = (props) => {
    const [selected, setSelected] = React.useState("")
    let [confirmEmail, setConfirmEmail] = React.useState([false, ""])
    let [regError, setRegError] = React.useState([false, ""])
    const [toHome, setToHome] = React.useState(false)
    const [data, setData] = React.useState([])
    const { id } = useSelector((state) => {
        return {
            id: state.user.id_user
        }
    })

    console.log('id user ', id)
    console.log('data payment', data)

    React.useEffect(() => {
        Axios.get(`http://localhost:2000/cart/summary/${parseInt(id)}`)
            .then(res => (setData(res.data)))
            .catch(err => console.log(err))
    }, [id])

    const handleChange = e => {
        e.persist()
        console.log(e.target.value)

        setSelected(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        async function fetchData() {
            try {
                const order_number = data[0].order_number
                const payment_method = selected
                let res = await Axios.post(`http://localhost:2000/cart/invoice/${parseInt(id)}`, {order_number, payment_method})
                console.log(res)
                setConfirmEmail([true, "Invoice has been sent to your email. Confirm your payment on history"])
            }
            catch (err) {
                console.log(err.response.data)
                setRegError([true, "ERROR"])
            }
        }
        fetchData()
    }

    const handleOk = () => {
        setConfirmEmail([false, ""])
        setToHome(true)
    }

    if(!props.location.search) return <Redirect to="*"/>
    if(toHome) return <Redirect to="/"/>
    return (
        <div style={styles.container}>
            <div style={{border: '1px solid #adb5bd', width: '55vw'}}>
                <div style={{padding: 15}}>
                    <h3>Choose Payment Method:</h3>
                    <hr/>
                    <Form.Group controlId={selected}>
                        <div>
                            <Form.Check
                                value="BCA"
                                type="radio"
                                aria-label="radio 1"
                                label={
                                    <Image
                                        src="https://1.bp.blogspot.com/-LOG22fyGGOo/WransnAeOlI/AAAAAAAABiA/RnFHp0YAHuIcmzMDZNnHFFz-M2sqUEPFQCKgBGAs/s1600/logo-bca.jpg"
                                        style={{ width: '80px', height: '33px' }}
                                    />
                                }
                                onChange={handleChange}
                                checked={selected === "BCA"}
                            />
                            <div style={{ marginLeft: '20px' }}>
                                <p>Bank BCA - 000-000-0000</p>
                                <p style={{ marginTop: '-15px' }}>a.n Electronic Shop</p>
                            </div>
                        </div>

                        <div>
                            <Form.Check
                                value="Mandiri"
                                type="radio"
                                aria-label="radio 2"
                                label={
                                    <Image
                                        src="http://1.bp.blogspot.com/-zkv5u5OGPEM/VKOWnIRRKBI/AAAAAAAAA7E/ovxa4ZW3I0o/w1200-h630-p-k-no-nu/Logo%2BBank%2BMandiri.png"
                                        style={{ width: '100px', height: '50px' }}
                                    />
                                }
                                onChange={handleChange}
                                checked={selected === "Mandiri"}
                            />
                            <div style={{ marginLeft: '20px' }}>
                                <p>Bank Mandiri - 000-000-0000</p>
                                <p style={{ marginTop: '-15px' }}>a.n Electronic Shop</p>
                            </div>
                        </div>

                        <div>
                            <Form.Check
                                value="BNI"
                                type="radio"
                                aria-label="radio 2"
                                label={
                                    <Image
                                        src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png"
                                        style={{ width: '80px', height: '28px' }}
                                    />
                                }
                                onChange={handleChange}
                                checked={selected === "BNI"}
                            />
                            <div style={{ marginLeft: '20px' }}>
                                <p>Bank BNI - 000-000-0000</p>
                                <p style={{ marginTop: '-15px' }}>a.n Electronic Shop</p>
                            </div>
                        </div>
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={handleSubmit} 
                        style={{marginLeft: 500, width: 150}}
                    >
                        Place Order
                    </Button>
                </div>

                <Modal show={confirmEmail[0]} onHide={() => setConfirmEmail([false, ""])}>
                    <Modal.Header closeButton>
                        <Modal.Title>Checkout Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{confirmEmail[1]}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleOk}>
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>
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

            {
                data.length !== 0
                    ?
                    <div style={{border: '1px solid #adb5bd', width: '25vw', height: '40vh'}}>
                        <div style={{width: '20vw', padding: 15, marginTop: 10, marginRight: 10 }}>
                            <h4>Order Summary</h4>
                            <hr/>
                            <p style={{ fontSize: '20', fontWeight: 'bold' }}>Shipping to:</p>
                            <p style={{ marginTop: '-10px' }}>{data[0].address}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h5>Order Total: </h5>
                                <p>IDR {data[0].total.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div></div>

            }
        </div>
    )
}

const styles = {
    container: {
        marginTop: '120px',
        marginLeft: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        width: '90vw'
    }
}
export default Checkout