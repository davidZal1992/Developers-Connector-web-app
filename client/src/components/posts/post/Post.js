import React ,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../spinner/Spinner'
import {Link} from 'react-router-dom'
import PostItem from '../../../components/posts/post-item/PostItem'
import CommentForm from '../comment/comment-form/CommentForm'
import CommentItem from '../comment/comment-item/CommentItem'
import { getPost } from '../../../actions/posts'
import Alert from '../../../components/alert/Alert'

const Post = ({match,post:{post,loading},getPost}) => {
    useEffect(() =>{
        getPost(match.params.id)
    },[getPost,match])

    return (
        <section className="container">
            <div className="show-alert my-1">
                    <Alert/>
            </div>
            {
            loading || post==null ? <Spinner/> :(
            <Fragment>
                <Link to='/posts' className='btn'>Back to Posts</Link>
                <PostItem post={post} showActions={false}/>
                <CommentForm postId={match.params.id}/>
                <div className="comments">
                    {post.comments.length > 0 && post.comments.map(comment =>(
                         <CommentItem key={comment._id} comment={comment} postId={post._id}  />
                    ))
                    }
                </div>
             </Fragment>
            )
             }
        </section>
    )
}

Post.propTypes = {
    post:PropTypes.object.isRequired,
    getPost:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    post:state.post
})

export default connect(mapStateToProps,{getPost})(Post)
