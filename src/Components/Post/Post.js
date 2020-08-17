import React, { useState, useEffect } from 'react'
import './Post.css'
import { Avatar, Button, Input } from "@material-ui/core"
import { db } from '../../Database/firebase'


function Post({ loggedInUser, userName, imageUrl, caption, timestamp, postId, user }) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')



    useEffect(() => {
        let unsubscribe
        if (postId) {
            unsubscribe = db.collection('posts')
                .doc(postId)
                .collection('comments')
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => ({ userName: doc.data().userName, text: doc.data().text })))
                })
        }
        return () => {
            unsubscribe()
        }
    }, [postId])

    const submitComment = (e) => {
        e.preventDefault()
        db.collection('posts')
            .doc(postId)
            .collection('comments').add({
                userName: loggedInUser,
                text: comment
            })
        setComment('')
    }

    return (
        <div className="post">

            <div className="post__header">
                <Avatar className="post__header__avatar" alt={userName} src="/static/images/avatar/1.jpg" />
                <h4>{userName}</h4>
            </div>

            <img className="post__image" src={imageUrl} alt="a post"></img>

            <h4 className="post__caption"><strong>{userName}</strong> : {caption}</h4>
            {/* <p>{new Date(seconds)}</p> */}
            <div className="post__comments">
                {comments.map((comment, index) => {
                    return (
                        <div key={index} className="post__comments__comment">
                            <Avatar className="post__comments__comment__avatar" alt={comment.userName} src="/static/images/avatar/1.jpg" />
                            <span>{comment.userName}: {comment.text}</span>
                        </div>
                    )
                })}
            </div>
            {user && (
                <form onSubmit={submitComment} className="post__commentBox">
                    <Input type="text" className="post__input" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment" />
                    <Button type='submit' className="post__button" disabled={comment === ''} variant="contained" size="small" >
                        Post
                    </Button>
                </form>
            )}

        </div>
    )
}

export default Post