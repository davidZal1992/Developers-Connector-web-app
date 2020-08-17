import React ,{useState,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addExperience} from '../../../actions/profile'
import {withRouter,Link} from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Alert from '../../alert/Alert'

const AddExperience = ({addExperience,history}) => {

    const [formData,setFormData] = useState({
        title:'',
        company:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:'' 
        })

    const {
        location,
        current,
        } = formData   

    const [currentDisable,setCurrentDisable] = useState(false)

    const onChange = e =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const onSubmit = e =>{
        e.preventDefault();
        addExperience(formData,history)
    }    
    return (
        <div>
          <Fragment>
          <section className="container">
                <h1 className="large text-primary">Add An Experience</h1>
                <p className="lead">
                    <i className="fas fa-graduation-cap"></i> Add any developer/programming positions that you have had in the past
                </p>
                <small>* = required field</small>
                <form className="form-profile">
                    <div className="show-alert"><Alert/></div>
                    <div className="form-group">
                        <input type="text" placeholder="* Job Title" name="title" onChange={(e) => onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Company" name="company" onChange={(e) => onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <GooglePlacesAutocomplete placeholder="Location" name={location} value={location} onSelect={(e) =>{setFormData({...formData, location: e.description})}}/>
                    </div>
                    <div className="edu-fields">
                        <div className="form-group">
                            <h4>From Date</h4>
                            <input type="date" name="from" onChange={(e) => onChange(e)} />
                        </div>
                        <div className="form-group" style={{marginLeft:'15px'}}>
                            <h4>To Date</h4>
                            <input type="date" name="to" disabled={currentDisable}  onChange={(e) => onChange(e)} />
                        </div>
                    </div>
                    <span className="form-group">
                        <p><input type="checkbox" onChange={()=> {
                            setCurrentDisable(!currentDisable); 
                            setFormData({...formData, current:!current});}} 
                            name="current" /> Current Job</p>
                    </span>
                    <div className="form-group">
                        <textarea name="description" cols="30" rows="5" placeholder="Job Description" onChange={(e) =>onChange(e)} ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary my-1" onClick={(e) =>onSubmit(e)}>Submit</button>
                    <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>
                </form>
            </section>
        </Fragment>  
        </div>
    )
}

addExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}


export default connect(null,{addExperience})(withRouter(AddExperience))
