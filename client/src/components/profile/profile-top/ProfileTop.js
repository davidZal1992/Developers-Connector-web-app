import React from 'react'
import PropTypes from 'prop-types'
import profile from '../../../reducers/profile'

const ProfileTop = ({profile: {
    user:{avatar,name},
    company,
    website,
    status,
    social,
    location}
    }) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img className="round-img" src={avatar} alt=""></img>
            <h1 className="large">{name}</h1>
            <p className="lead">{status}{company && <span> At {company}</span>}</p>
            <p>{location}</p>
            <div className="icons my-1">
                {
                website && 
                (<a href={website} target='_blank' rel='noopener noreferrer'><i className='fas fa-globe fa-2x'/></a>)
                }
                {
                social && social.twitter &&
                (<a href={social.twitter} target='_blank' rel='noopener noreferrer'><i className='fab fa-twitter fa-2x'/></a>)
                }
                {
                social && social.facebook &&
                (<a href={social.facebook} target='_blank' rel='noopener noreferrer'><i className='fab fa-facebook fa-2x'/></a>)
                }
                {
                social && social.youtube &&
                (<a href={social.youtube} target='_blank' rel='noopener noreferrer'><i className='fab fa-youtube fa-2x'/></a>)
                }
                {
                social && social.linkedin &&
                (<a href={social.linkedin} target='_blank' rel='noopener noreferrer'><i className='fab fa-linkedin fa-2x'/></a>)
                }
                {
                social && social.instagram &&
                (<a href={social.instagram} target='_blank' rel='noopener noreferrer'><i className='fab fa-instagram fa-2x'/></a>)
                }
            </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile:PropTypes.object.isRequired,
}

export default ProfileTop
