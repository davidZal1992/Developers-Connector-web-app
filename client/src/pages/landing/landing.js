import React from 'react'
import {Link} from 'react-router-dom';
import './landing.css'
import '../../App.css'

export const Landing = () => {
    return (
            <section className="landing">
            <div className="dark-overlay">
                ` <div className="landing-inner">
                    <h1 className="x-large"><span style={{color: "#17a2b8"}}>DEV</span>ELOPERS Connector</h1>
                    <p className="lead">Create developer profile, share posts and get help fromother developers</p>
                    <div className="buttons">
                      <Link to='/register' className="btn btn-primary">Sign Up</Link>
                      <Link to='/login' className="btn btn-light">Login</Link>
                   </div>
                </div>`
            </div>
            </section>
    )
}
