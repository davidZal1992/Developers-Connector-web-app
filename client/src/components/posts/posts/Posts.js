import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {getPosts} from '../../../actions/posts'
import { connect } from 'react-redux'
import Spinner from '../../spinner/Spinner'
import PostItem from '../post-item/PostItem'
import PostForm from '../post-form/PostForm'
import Alert from '../../alert/Alert'
import './Post.css'
const Posts = ({getPosts, post:{posts,loading}}) => {
    useEffect(() => {
        getPosts()
    },[getPosts])
    return loading ? <Spinner /> : (
        <Fragment>
            <section className="container">
                <p className="lead">
                    <i className="fas fa-edit"></i> Welcome to the community
                </p>
                <div className="my-2">
                <Alert/>
                </div>
                <PostForm/>
                <div className="posts">
                    {posts.map((post) =>(
                        <PostItem key={post._id} post={post}/>
                    ))}
                </div>
            </section>
        </Fragment>
    );
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post:state.post
})


export default connect(mapStateToProps, {getPosts})(Posts)
