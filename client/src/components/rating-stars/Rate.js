import React, {useState,Fragment} from 'react'
import {FaStar} from 'react-icons/fa'
import {connect} from 'react-redux'
import {rateUser} from '../../actions/profile'

import './Rate.css'
 const Rate = ({edit,value,rateUser,user}) => {
     const [rating,setRating] = useState(null)
     const [hover,setHover] = useState(null)

     const nonEditable = (
        <div>
            {[...Array(5)].map((star,i) => {
                return(
                    <label key={i}>
                    <input 
                    type="radio" 
                    name="rating" 
                    value={value} 
                    />
                    <FaStar
                    key={i}
                    className="star"
                    color={i+1 <= value ? "#ffc107" :"#141518" }
                    size={20}
                    />
                    </label>
                            )
                        }
                        )
                     }
        </div>
                
    )

    const editable = (
        <div>
        {[...Array(5)].map((star,i) => {
            const ratingValue = i +1;
             return(
            <label key={i}>
            <input 
            type="radio" 
            name="rating" 
            value={ratingValue} 
            onClick={() =>{setRating (ratingValue); rateUser(ratingValue,user)}}
            />
            <FaStar
            key={i}
            className="star"
            color={ratingValue <= (hover || rating) ? "#ffc107" :"#141518" }
            size={20}
            onMouseOver={()=> setHover(ratingValue)}
            onMouseOut={()=> setHover(null)}
            /> 
    </label>
    )     }
        )}
        </div>)


    return (
        <Fragment>{ edit ? editable : nonEditable} </Fragment>

    )
}

Rate.defaultProps = {
    value: 0,
    edit: true
  };

export default connect(null,{rateUser})(Rate)