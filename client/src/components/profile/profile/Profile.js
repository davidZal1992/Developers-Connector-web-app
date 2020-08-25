import React, { Fragment,useEffect } from 'react'
import PropTypes from 'prop-types'
import {withRouter,Link} from 'react-router-dom'
import {connect } from 'react-redux'
import Spinner from '../../spinner/Spinner';
import {getProfileById} from '../../../actions/profile'
import ProfileTop from '../profile-top/ProfileTop'
import ProfileAbout from '../profile-about/ProfileAbout'
import ProfileExperience from '../profile-experience/ProfileExperience'
import ProfileEducation from '../profile-education/ProfileEducation'
import ProfileRepos from '../profile-repos/ProfileRepos'
import './Profile.css' 

const Profile = ({match,getProfileById, profile: {profile,loading} ,auth,history}) => {
    useEffect(() =>{
        getProfileById(match.params.id,history)
    },[getProfileById,match,history])
    return (
        <section className="container">
            {profile===null || loading ? (<Spinner/>) :(
            <Fragment >
                <Link to="/profiles" className = "btn btn-light"> Back to profiles</Link>`
                {auth.isAuthenticated && !auth.loading && auth.user._id===profile.user._id && <Link className="btn btn-dark" to="/edit-profile">Edit profile</Link>}
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile}/>
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (
                        <Fragment>
                            {profile.experience.map(experience =>(
                            <ProfileExperience key={experience._id} experience={experience}/>
                            ))}
                        </Fragment>) : 
                        (<h4>No experience credentials</h4>)
                        }
                    </div>
                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile.education.length > 0 ? (
                        <Fragment>
                            {profile.education.map(education =>(
                            <ProfileEducation key={education._id} education={education}/>
                            ))}
                        </Fragment>) : 
                        (<h4>No Education credentials</h4>)
                        }
                    </div>
                    {profile.githubusername && <ProfileRepos username={profile.githubusername}/>}
                </div>
            </Fragment>
            )}
        </section>
    )
}


Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, {getProfileById})(withRouter(Profile))
