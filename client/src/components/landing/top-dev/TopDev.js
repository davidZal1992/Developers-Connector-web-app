import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import {getTop} from '../../../actions/profile'
import TopDevItem from '../top-dev-item/TopDevItem'
import PropTypes from 'prop-types'
import './TopDev.css'

const TopDev = ({getTop, toprates}) => {

    useEffect(() => {
        getTop()
    }, [getTop])

    return (
        <Fragment>
            <h1 className="text-center text-primary large">Our Top Developers
                <hr className="divider m-1 text-center"/>
            </h1>
            <div className="top-dev">
                {toprates.map((profile,i) => (
                    <TopDevItem key={i} profile={profile}/>
                ))}
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    toprates : state.profile.toprates
})

TopDev.propTypes = {
    toprates:PropTypes.array.isRequired,
    getTop:PropTypes.func.isRequired
}

export default connect(mapStateToProps, {getTop})(TopDev)
