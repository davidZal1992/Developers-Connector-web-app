import React , {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Moment from 'react-moment';
import {removeComment} from '../../../../actions/posts'
const CommentItem = ({
    postId,
    auth,
    comment: {_id,text, name, avatar,user,date},
    removeComment
})=> {
    return (
        <div>
            <div className="post bg-white my-1 p-1">
                        <div>
                            <Link to={`/profile/${user}`}>
                                <img className="round-img" src={avatar} alt=""></img>
                                <h4>{name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className='my-1'>
                                {text}
                            </p>
                            <p className='post-date>'>Posted on <Moment format="DD/MM/YYYY">{date}</Moment></p>
                            <Fragment>
                                {!auth.loading && user === auth.user._id && 
                                (<button type='button' className="btn btn-danger" onClick={(e) => removeComment(postId,_id)} >
                                    <i className="fas fa-times"></i>
                                </button>
                                )}
                            </Fragment>
                        </div>
                </div>
        </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapPropsToState = state =>({ 
    auth:state.auth
})

export default connect(mapPropsToState,{removeComment})(CommentItem)
