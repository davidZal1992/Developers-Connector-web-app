import React from 'react'
import {Link,Redirect} from 'react-router-dom';
import './landing.css'
import '../../App.css'
import {connect} from 'react-redux'

const Landing = ({isAuthenticated}) => {
    if(isAuthenticated){
      return <Redirect to="/dashboard"/>
    }

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

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)