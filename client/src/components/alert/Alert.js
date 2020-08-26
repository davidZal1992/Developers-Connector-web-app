import React from 'react'
import {connect} from 'react-redux'
import './Alert.css'
const Alert = ({alert}) => 
    alert.msg !== undefined &&
    <div className={`alert-${alert.alertType}`}>
        <span className="msg"><strong>{alert.alertType==='danger' ? 'Warning' : 'Success'}!</strong> {alert.msg}</span>
    </div>

const mapStateToProps = state =>({
    alert: state.alert
})

export default connect(mapStateToProps)(Alert);
