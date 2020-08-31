import React from 'react'
import PropTypes from 'prop-types'
import Rate from '../../rating-stars/Rate'
import {Link} from 'react-router-dom'
import './TopDevItem.css'
const TopDevItem = ({profile:{user:{_id,name,avatar},company,status,rating}}) => {
    return (
        <div className="card my-1 p-1">
                <Link to={`/profile/${_id}`}><img  src={avatar} className="round-img" alt=""/></Link>
                <h2 className="text-primary">{name}</h2>
                {status && <p>{status}</p>}
                {company ?<p>{company}</p> : <p><br/></p>}
                <div className="rate-inline">
    <Rate edit={false} value={rating.totalRates/rating.rates.length}></Rate>
    ({(rating.totalRates/rating.rates.length).toFixed(2)})
                </div>
        </div>
    )
}


TopDevItem.propTypes = {
    profile:PropTypes.object.isRequired,
}

export default TopDevItem
