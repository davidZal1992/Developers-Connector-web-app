import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Rate from '../../rating-stars/Rate'
import {Link} from 'react-router-dom'
import Alert from '../../alert/Alert'
const ProfileAbout = ({
    profile:{
        bio,
        skills,
        user,
    },
    isAuthenticated
    }) => {
    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <Fragment>
                    <h2 className="text-primary">{user.name.trim().split(' ')[0]}`s Bio</h2>
                    <p>
                        {bio}
                    </p>
                    <div className="line"></div>
                </Fragment>
            )}
            <h2 className="text-primary">Skills Set</h2>
            <div className="skills">
                {skills.map((skill,index) => (
                    <div key={index} className="p">
                        <i className="fas fa-check"/>
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile:PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool.isRequired,
}

export default ProfileAbout
