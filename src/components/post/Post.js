import React, {useCallback} from "react";
import styled from "styled-components";

import PostHeader from "./PostHeader";
import Comment from "../comments/Comment";
import PostActions from "./PostActions";
import CommentsWrapper from "../comments/CommentsWrapper";
import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import {togglePostLike} from "../../actions/postsActions";
import {sendComment, toggleCommentLike as toggleCommentLikeAction} from "../../actions/commentsActions";
import {createSelector} from "reselect";
import CommentSender from "../comments/CommentSender";
import {MemoDecorator} from "../../containers/decorators";

const PostWrapper = styled.article`
    margin-bottom: 60px;
    border-radius: 3px;
    border: 1px solid #dbdbdb;
`;

const PostImage = React.memo(styled.img`
    display: block;
    width: 100%;
    height: auto;
`);

const avatar = 'https://scontent-arn2-2.cdninstagram.com/v/t51.2885-19/s150x150/44296648_251617955511393_1918479114218504192_n.jpg?_nc_ht=scontent-arn2-2.cdninstagram.com&_nc_ohc=i0-8EfQJq1QAX-MKEL9&oh=38f4d22bcaa763a37bca85da5eb0ba2b&oe=5EB08A8D';

const Post = ({ id, disabledSending, firstTwoComments }) => {
    const dispatch = useDispatch();
    const { author: profileName, imgSrc: postImage, description, likesCount, liked } = useSelector(state => state.homePage.posts.list[id]);

    console.log('render POST ' + id);

    const toggleLike = useCallback(() => {
        dispatch(togglePostLike(id))
    }, [dispatch, id]);

    const toggleCommentLike = useCallback((commentId) => {
        dispatch(toggleCommentLikeAction(commentId))
    }, [dispatch]);

    const onSend = useCallback((text) => {
        const newComment = {
            profileName: `admin`,
            text: text,
            postId: id,
        };
        dispatch(sendComment(newComment));
    }, [dispatch, id]);

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
                                     comments={firstTwoComments}/>
                </div>

                <CommentSender disabled={disabledSending} onSend={onSend}/>
            </div>
        </PostWrapper>
    );
};

const selectDisabledSending = createSelector(
    (state) => state.homePage.comments.disabledSendingPostsIds,
    (state, ownState) => ownState.id,
    (disabledSendingPostsIds, id) => disabledSendingPostsIds.includes(id),
);

const selectFirstTwoComments = createSelector(
    (state, ownState) => state.homePage.posts.list[ownState.id].commentsIds,
    (state) => state.homePage.comments.list,
    (commentsIds, commentsList) => commentsIds
        .filter(Boolean)
        .slice(0, 2)
        .map((id) => commentsList[id]),
);

const mapStateToProps = (state, ownState) => ({
    disabledSending: selectDisabledSending(state, ownState),
    firstTwoComments: selectFirstTwoComments(state, ownState),
    id: ownState.id,
});

export const PostConnect = connect(mapStateToProps)(MemoDecorator(Post));

export default Post;
