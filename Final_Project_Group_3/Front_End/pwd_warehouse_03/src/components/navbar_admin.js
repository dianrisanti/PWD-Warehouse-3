import React from 'react'
import {
    Navbar,
    Nav,
    NavLink,
    Dropdown,
    DropdownButton,
    Image
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { Logo } from '../assets'

import { useSelector, useDispatch } from 'react-redux'

//NOTE import action log out
import { logout } from "../actions"

function NavigationAdmin() {
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
        <Navbar fixed='top' style={{ background: '#118ab2' }} expand="lg">
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
                <p style={{ fontFamily: 'Sriracha, cursive', fontSize: '28px', marginTop: '12px' }}>ES - Admin</p>
            </Navbar>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{marginLeft:'50px'}}>
                <Nav className="mr-auto">
                    <NavLink as={Link} to='/get_category' style={{ color: 'black' }}>
                        <strong> Category List</strong>
                    </NavLink>
                    <NavLink as={Link} to='/warehouse_stock' style={{ color: 'black' }}>
                        <strong> Warehouse Stock</strong>
                    </NavLink>
                    <NavLink as={Link} to='/order_listing' style={{ color: 'black' }}>
                        <i className="fas fa-dollar-sign" syle={{ marginRight: '15px' }}></i>
                        <strong> Order Listing</strong>
                    </NavLink>
                    <NavLink as={Link} to='/sales_report' style={{ color: 'black' }}>
                        <i className="far fa-chart-bar" syle={{ marginRight: '15px' }}></i>
                        <strong> Sales Report</strong>
                    </NavLink>
                </Nav>

                <Dropdown>
                    <DropdownButton title={username}
                        variant='primary' id="dropdown-button-drop-left" >
                        <Dropdown.Item as={Link} to='/login' onClick={logoutHandler}>Log out</Dropdown.Item>
                    </DropdownButton>
                </Dropdown>
            </Navbar.Collapse >
        </Navbar >
    )
}


export default NavigationAdmin