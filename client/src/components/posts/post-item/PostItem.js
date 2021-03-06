import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import {addLike,removeLike,deletePost} from '../../../actions/posts'
import './PostItems.css'

const PostItem = ({
    post:{_id,text,name,avatar,user,likes,comments,date},
    auth,
    addLike,
    deletePost,
    showActions,
    removeLike}) => {
    return (
        <Fragment>
                <div className="post bg-white my-1 p-1">
                        <div>
                            <Link to={`/profile/${user}`}>
                                <img className="round-img" src={avatar} alt=""></img>
                                <h4>{name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className='my-1'>
                                <strong>{text}</strong>
                            </p>
                            <p className='post-date>'>Posted on <Moment format="DD/MM/YYYY">{date}</Moment></p>
                            {showActions && 
                            <Fragment>
                                <button className="btn btn-light" onClick={(e) => addLike(_id)}>
                                    <i className="fas fa-thumbs-up"></i>
                                    {likes.length>0 && 
                                    (<span className='comment-count'> {likes.length}</span>)
                                    }
                                </button>
                                <button type='button' className="btn btn-light" onClick={(e) => removeLike(_id)}>
                                    <i className="fas fa-thumbs-down"></i>
                                </button>
                                <Link to={`/posts/post/${_id}`} className="btn btn-primary">
                                    Discussion
                                    {comments.length>0 && 
                                    (<span className='comment-count'> {comments.length}</span>)
                                    }
                                </Link>
                                {!auth.loading && user === auth.user._id && 
                                (<button type='button' className="btn btn-danger" onClick={(e) => deletePost(_id)} >
                                    <i className="fas fa-times"></i>
                                </button>
                                )}
                            </Fragment>}
                        </div>
                </div>
        </Fragment>
    )
}

PostItem.defaultProps = {
    showActions:true
}

PostItem.propTypes = {
  post:PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired,
  addLike:PropTypes.func.isRequired,
  removeLike:PropTypes.func.isRequired,
  deletePost:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps,{addLike,removeLike,deletePost})(PostItem)
