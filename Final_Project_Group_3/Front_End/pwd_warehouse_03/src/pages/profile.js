import React from 'react'
import Axios from 'axios'
import {
    Image,
    Button,
    Form,
    FormControl
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { editProfile } from '../actions'

const Profile = () => {
    const { id_user, username, email, location, address } = useSelector((state) => {
        return{
            id_user: state.user.id_user,
            username: state.user.username,
            email: state.user.email,
            location: state.user.location,
            address: state.user.address
        }
    })
    const dispatch = useDispatch()

    const [dataLoc, setDataLoc] = React.useState([])
    const [edit, setEdit] = React.useState(false)
    const [locId, setLocId] = React.useState(null)
    const [loc, setLoc] = React.useState(location)
    const [addressInput, setAddressInput] = React.useState(address)

    React.useEffect(() => {
        Axios.get('http://localhost:2000/profile/user_location')
            .then(res => setDataLoc(res.data))
            .catch(err => console.log(err))
    }, [])

    const changeLoc = (e) => {
        const input = e.target.value
        setLoc(input)
        
        const changedLoc = dataLoc.find(item => item.province_name === input)
        const province = changedLoc.id
        setLocId(+province)
    }
    
    const changeAddress = (e) => {
        console.log(e.target.value)
        setAddressInput(e.target.value)
    }

    const saveHandler = () => {
        const data = {
            location_id: locId,
            address: addressInput
        }

        dispatch(editProfile(data, +id_user))
        setEdit(false)
    }

    return(
        <div style={styles.container}>
            <Image 
                src="https://i.pinimg.com/474x/15/a8/bc/15a8bc7417bb5583b96c24a359fd5dfe.jpg" 
                thumbnail
                style={{width: '200px', height: '200px'}}
            />
            {
                edit
                ?
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '70vw', marginLeft: '25px'}}>
                    <div>
                        <h4>Profile</h4>
                        <p>Username: {username}</p>
                        <p>Email: {email}</p>
                        <p>Provinsi: 
                            <Form.Control 
                                as="select" 
                                value={loc ? loc : ""} 
                                onChange={(e) => changeLoc(e)}
                            >
                                {
                                    dataLoc.map((item, index) => {
                                        return (<option key={index} value={item.province_name}>{item.province_name}</option>)
                                    })
                                }
                            </Form.Control>
                        </p>
                        <p>Alamat: 
                            <FormControl onChange={(e) => changeAddress(e)} value={addressInput}/>
                        </p>
                    </div>
                    <div>
                        <Button variant="success" style={{width: '40px', height: '35px', marginRight: '10px'}} onClick={saveHandler}><i className="far fa-check-square"></i></Button>
                        <Button variant="danger" style={{width: '40px', height: '35px'}} onClick={() => setEdit(false)}><i className="far fa-window-close"></i></Button>
                    </div>
                </div>
                :
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '70vw', marginLeft: '25px'}}>
                    <div>
                        <h4>Profile</h4>
                        <p>Username: {username}</p>
                        <p>Email: {email}</p>
                        <p>Provinsi: {loc}</p>
                        <p>Alamat: {addressInput}</p>
                    </div>
                    <Button style={styles.button} onClick={() => setEdit(true)}><i className="fas fa-edit"></i></Button>
                </div>
            }
        </div>
    )
}

const styles = {
    container: {
        display: 'flex', 
        flexDirection: 'row', 
        marginLeft: '60px',
        marginTop: '160px'
    },

    button: {
        width: '38px',
        height: '38px',
        backgroundColor: '#dda15e'
    }
}

export default Profile