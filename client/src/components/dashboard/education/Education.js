import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {deleteEducation} from '../../../actions/profile'
import { connect } from 'react-redux'

const Education = ({deleteEducation,education}) => {

    const displayDetails = education.map((edu) => (
        <tr key={edu._id}>
            <td className="hide-sm">{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td className="hide-sm"><Moment format='DD/MM/YYYY'>{edu.from}</Moment> - {edu.to === null ? ('Today') : (<Moment format='DD/MM/YYYY'>{edu.from}</Moment>)}</td>
            <td><button className="btn btn-danger" onClick={(e)=> deleteEducation(edu._id)}>Delete</button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className="hide-sm">School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {displayDetails}
                </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null,{deleteEducation})(Education)

