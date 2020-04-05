import React, {useState} from "react";
import styled from "styled-components";

import PostHeader from "./PostHeader";
import CommentSender from "../comments/CommentSender";
import Comment from "../comments/Comment";
import PostActions from "./PostActions";
import CommentsWrapper from "../comments/CommentsWrapper";

const PostWrapper = styled.article`
    margin-bottom: 60px;
    border-radius: 3px;
    border: 1px solid #dbdbdb;
`;

const PostImage = styled.img`
    display: block;
    width: 100%;
    height: auto;
`;

const avatar = 'https://scontent-arn2-2.cdninstagram.com/v/t51.2885-19/s150x150/44296648_251617955511393_1918479114218504192_n.jpg?_nc_ht=scontent-arn2-2.cdninstagram.com&_nc_ohc=i0-8EfQJq1QAX-MKEL9&oh=38f4d22bcaa763a37bca85da5eb0ba2b&oe=5EB08A8D';

const Post = ({ profileName, postImage, comments, description, likesCount }) => {
    const [commentsList, setComments] = useState(comments);

    // TODO: Remove this mutation events
    const sendComment = (value) => {
        setComments([...commentsList, {
            id: commentsList.length,
            profile: 'admin',
            liked: false,
            text: value,
        }]);
    };

    const toggleCommentLike = (id, liked) => {
        const likedComment = commentsList.find((comment) => comment.id === id);
        likedComment.liked = !likedComment.liked;
        setComments([...commentsList]);
        console.log(commentsList);
    };

    return (
        <PostWrapper>
            <PostHeader profileName={profileName}
                        avatar={ avatar }
                        additionalInfo='Omsk, Russia'/>

            <div className='post-content'>
                <PostImage src={ postImage }/>
            </div>

            <div className='post-actions'>
                <PostActions/>

                <section style={{ marginBottom: '8px' }}
                         className='padding'>
                    <button className='bold'
                            type='button'>
                        { likesCount.toLocaleString('ru-RU') } отметок "Нравится"
                    </button>
                </section>

                <div className="post-comments-wrapper padding">
                    <div className="post-description">
                        <Comment isDescription={ true }
                                 profile={profileName}
                                 text={description}/>
                    </div>
                    <CommentsWrapper comments={commentsList}
                                     toggleCommentLike={toggleCommentLike}/>
                </div>

                <CommentSender onSend={sendComment}/>
            </div>
        </PostWrapper>
    );
};

export default Post;
