import React from 'react'
import {
    Navbar,
    Nav,
    NavLink,
    Dropdown,
    DropdownButton,
    Image
} from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'

import { Logo } from '../assets'

import { useSelector, useDispatch } from 'react-redux'

//NOTE import action log out
import { logout } from "../actions"

function Navigation() {
    const { username, role } = useSelector((state) => {
        return {
            username: state.user.username,
            role: state.user.role
        }
    })



    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
        <Navbar fixed='top' style={{ background: 'rgba(82, 192, 192, 0.7)' }} expand="lg">
            <Navbar>
                <Navbar.Brand as={Link} to='/'>
                    <Image
                        alt="Electronic-Shop"
                        src={Logo.default}
                        width="100px"
                        height="50px"
                        fluid
                    />
                </Navbar.Brand>
            <p style={{fontFamily:'Sriracha, cursive', fontSize:'28px', marginTop:'12px'}}>Electronic Shop</p>
            </Navbar>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {role === 1
                        ?
                        <>
                            <NavLink as={Link} to='/' style={{ color: 'black' }}>
                                <i className="fas fa-home" syle={{ marginRight: '15px' }}></i>
                                <strong> HOME</strong>
                            </NavLink>
                            <NavLink as={Link} to='/order_listing' style={{ color: 'black' }}>
                                <i className="fas fa-dollar-sign" syle={{ marginRight: '15px' }}></i>
                                <strong> Order Listing</strong>
                            </NavLink>
                            <NavLink as={Link} to='/sales_report' style={{ color: 'black' }}>
                                <i className="far fa-chart-bar" syle={{ marginRight: '15px' }}></i>
                                <strong> Sales Report</strong>
                            </NavLink>
                        </>
                        :
                        <>
                            <NavLink as={Link} to='/' style={{ color: 'black' }}>
                                <i className="fas fa-home" syle={{ marginRight: '10px' }}></i>
                                <strong> HOME</strong>
                            </NavLink>
                        </>
                    }
                </Nav>
                <Link to='/cart' style={{ fontSize: '30px', marginRight: '10px', marginBottom: '10px', textDecoration: 'none' }}> 🛒 </Link>
                <Dropdown>
                    <DropdownButton title={!username ? 'Username' : username}
                        variant={username ? 'primary' : 'success'} id="dropdown-button-drop-left" >
                        {username
                            ?
                            <>
                                {role === 1
                                    ?
                                    <>
                                        <Dropdown.Item as={Link} to ='/login' onClick={logoutHandler}>Log out</Dropdown.Item>
                                    </>
                                    :
                                    <>
                                        <Dropdown.Item as={Link} to ='/login' onClick={logoutHandler}>Log out</Dropdown.Item>
                                        <Dropdown.Item as={Link} to='/verification'>Verification</Dropdown.Item>
                                        <Dropdown.Item as={Link} to='/profile'>Profile</Dropdown.Item>
                                        <Dropdown.Item as={Link} to='/history'>History</Dropdown.Item>
                                    </>
                                }
                            </>
                            :
                            <>
                                <Dropdown.Item as={Link} to='/login' >Login</Dropdown.Item>
                                <Dropdown.Item as={Link} to='/register'>Sign Up</Dropdown.Item>
                            </>
                        }
                    </DropdownButton>
                </Dropdown>
            </Navbar.Collapse >
        </Navbar >
    )
}


export default Navigation