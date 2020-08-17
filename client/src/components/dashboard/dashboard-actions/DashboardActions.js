import React from 'react'
import './DashboardActions.css'
import {Link} from 'react-router-dom'
function DashboardActions() {
    return (
        <div className="dash-buttons">
            <Link to='/edit-profile' className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i> Edit profile
            </Link>
            <Link to='/add-experience' className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> Add Experince
            </Link>
            <Link to='/add-education' className="btn btn-light">
                <i className="fas fa-graduation-cap text-primary"></i> Add Education
            </Link>    
        </div>
    )
}

export default DashboardActions
