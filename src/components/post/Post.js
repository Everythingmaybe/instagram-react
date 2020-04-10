import React from "react";
import styled from "styled-components";

import PostHeader from "./PostHeader";
import CommentSender from "../comments/CommentSender";
import Comment from "../comments/Comment";
import PostActions from "./PostActions";
import CommentsWrapper from "../comments/CommentsWrapper";
import {useDispatch, useSelector} from "react-redux";
import {togglePostLike} from "../../actions/postsActions";
import {sendComment, toggleCommentLike as toggleCommentLikeAction} from "../../actions/commentsActions";
import {createSelector} from "reselect";

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

const Post = ({ id }) => {
    const dispatch = useDispatch();
    const homeState = useSelector(state => state.homePage);
    const { author: profileName, imgSrc: postImage, description, likesCount, liked } = useSelector(state => state.homePage.posts.list[id]);
    const disabledSendingPostsIds  = useSelector(state => state.homePage.comments.disabledSendingPostsIds);

    const disabledSending = disabledSendingPostsIds.includes(id);

    const commentsIds = (state) => state.posts.list[id].commentsIds;
    const commentsList = (state) => state.comments.list;

    const commentsIdsSelector = createSelector(
        [commentsIds, commentsList],
        (commentsIds, commentsList) => commentsIds
            .filter(Boolean)
            .slice(0, 2)
            .map((id) => commentsList[id]),
    );

    const toggleLike = () => {
        dispatch(togglePostLike(id))
    };

    const toggleCommentLike = (commentId) => {
        dispatch(toggleCommentLikeAction(commentId))
    };

    const onSend = (text) => {
        const newComment = {
            profileName: `admin`,
            text: text,
            postId: id,
        };
        dispatch(sendComment(newComment));
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
                <PostActions liked={liked} onLike={toggleLike}/>

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
                                 profileName={profileName}
                                 text={description}/>
                    </div>
                    <CommentsWrapper toggleCommentLike={toggleCommentLike}
                                     comments={commentsIdsSelector(homeState)}/>
                </div>

                <CommentSender disabled={disabledSending} onSend={onSend}/>
            </div>
        </PostWrapper>
    );
};

export default Post;
