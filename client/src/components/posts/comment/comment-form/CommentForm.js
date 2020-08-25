import React, { Fragment ,useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment} from '../../../../actions/posts'

const CommentForm = ({postId,addComment}) => {
    const [text,setText] = useState('')
    return (
        <Fragment>
            <div className="post-form">
                <div className="post-form-header bg-primary">
                    <h3>Leave a Comment</h3>
                </div>
                <form className="form my-1" onSubmit={e => {
                    e.preventDefault();
                    addComment(postId,{text});
                    setText('')
                }}>
                    <textarea cols="30" rows="5" placeholder="Leave a comment" onChange={e=> setText(e.target.value)}></textarea>
                    <input type="submit" value="Submit" className="btn btn-dark my-1"/>
                </form>
            </div>
        </Fragment>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId:PropTypes.string.isRequired,
}



export default connect(null, {addComment})(CommentForm)
