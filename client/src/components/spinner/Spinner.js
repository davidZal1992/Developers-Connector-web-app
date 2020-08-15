import React ,{Fragment} from 'react'
import './Spinner.css'
import spinner from '../../img/45.gif'
const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} className="spinner" alt="Loading..."/>
        </Fragment>
    )
}

export default Spinner