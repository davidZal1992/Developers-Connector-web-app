import React, {useEffect, Fragment} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {loadProfile} from '../../actions/profile'
import Spinner from '../spinner/Spinner'
const Dashboard = ({loadProfile, auth:{user}, profile: {profile,loading}}) => {
    useEffect (() => {
        loadProfile();
    },[]);

    return loading && profile == null ? <Spinner/> : <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"/> Welcome {user && user.name}
        </p>
        {profile !== null ? 
        <Fragment>has</Fragment> :
        <Fragment>
            <p>You have not yet setup profile, please add some info</p>
            <Link to='/create-profile' className ="btn btn-primary my-1">Create Profile</Link>
        </Fragment>
        }
    </section> 
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})



export default connect(mapStateToProps, {loadProfile})(Dashboard)
