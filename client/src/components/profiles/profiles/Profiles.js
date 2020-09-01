import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {getProfiles} from '../../../actions/profile'
import Spinner from '../../../components/spinner/Spinner'
import ProfileItem from '../profile-items/ProfileItem'
import {connect} from 'react-redux'

const Profiles = ({getProfiles, profile: {profiles,loading}}) => {

    useEffect(() => {
        getProfiles()
    }, [getProfiles])
    return (
        <Fragment>
        { loading ? <Spinner/> :
            <Fragment>
              <div >
                <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                      <i className="fab fa-connectdevelop"/> Browse and connect with developers
                    </p>
                    <div className="profiles">
                    { profiles.length > 0 ? 
                    ( profiles.map((profile) =>(
                       <ProfileItem key={profile._id} profile={profile}/>
                     ))
                    ) : <h4> No profiles founds...</h4>}
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles)
