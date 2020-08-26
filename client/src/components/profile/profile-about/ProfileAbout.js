import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Rate from '../../rating-stars/Rate'

const ProfileAbout = ({
    profile:{
        bio,
        skills,
        user:{name}
    }
    }) => {


    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <Fragment>
                    <h2 className="text-primary">{name.trim().split(' ')[0]}`s Bio</h2>
                    <p>
                        {bio}
                        <span className="line"></span>
                    </p>
                </Fragment>
            )}
            <h2 className="text-primary">Skills Set</h2>
            <div className="skills">
                {skills.map((skill,index) => (
                    <div key={index} className="p-1">
                        <i className="fas fa-check"></i>
                        {skill}
                    </div>
                ))}
            </div>
            <h2 className="text-primary">Rate me!</h2>
            <div>
            <Rate>
            </Rate>
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileAbout
