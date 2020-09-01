import React, {useEffect, Fragment} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {loadProfile,deleteAccount} from '../../../actions/profile'
import Alert from '../../alert/Alert'
import Spinner from '../../spinner/Spinner'
import Experience from '../experience/Experience'
import Education from '../education/Education'
import DashboardActions from '../dashboard-actions/DashboardActions'
const Dashboard = ({loadProfile,deleteAccount,auth:{user}, profile: {profile,loading}}) => {
    useEffect (() => {
        loadProfile();
    },[loadProfile]);

    return loading && profile == null ? <Spinner/> : <section >
        <div className="show-alert">
        <Alert/>
        </div>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"/> Welcome {user && user.name}
        </p>
        {profile !== null ? 
        <Fragment>
            <DashboardActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i> Delete My Account
                </button>
            </div>
        </Fragment> :
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



export default connect(mapStateToProps, {loadProfile,deleteAccount})(Dashboard)
