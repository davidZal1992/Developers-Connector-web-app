import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

import {logout} from '../../actions/auth'

import './Navbar.css'

const Navbar = ({auth,logout}) => {

    const forUsers = (
        <ul>
            <li> 
                <Link to='/profiles'>
                <i className="fas fa-users"></i> 
                <span className="hide-sm"> Developers</span>
                </Link>
            </li>
            <li> 
                <Link to='/dashboard'>
                <i className="fas fa-user"></i>
                <span className="hide-sm"> Dashboard</span>
                </Link>
            </li>
            <li> 
                <Link to='/posts'>
                <i className="fas fa-edit"></i>
                <span className="hide-sm"> Posts</span>
                </Link>
            </li>
            <li> 
                <a onClick={logout} href='#!'>
                     <i className="fas fa-sign-out-alt"></i>
                     <span className="hide-sm"> Logout</span>
                </a> 
            </li>
        </ul>
    )

    const forGuests =  (
        <ul>
            <li> 
                <Link to='/profiles'>
                    Developers
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    Register
                </Link>
            </li>
            <li>
                <Link to='/login'>
                    Login
                </Link>
            </li>
        </ul>
    )
    return (
            <nav className="navbar bg-dark">
                <h1>
                    <Link to='/'>
                        <i className="fas fa-laptop-code"></i> DevCOM
                    </Link>
                </h1>
                <Fragment>{auth.isAuthenticated ? forUsers : forGuests }</Fragment>
            </nav>
    )
}

const mapStateToProps = state => (
    {
        auth : state.auth
    }
)

export default connect(mapStateToProps,{logout})(Navbar)