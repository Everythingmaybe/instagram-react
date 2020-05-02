import React, {useCallback} from "react";
import styled from "styled-components";

import PostHeader from "./PostHeader";
import Comment from "../comments/Comment";
import PostActions from "./PostActions";
import CommentsWrapper from "../comments/CommentsWrapper";
import {connect} from "react-redux";
import {togglePostLike} from "../../actions/postsActions";
import {sendCommentStarted, toggleCommentLike as toggleCommentLikeAction} from "../../actions/commentsActions";
import {createSelector} from "reselect";
import CommentSender from "../comments/CommentSender";
import {MemoDecorator} from "../../containers/decorators";
import {useHistory} from "react-router";

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

const Post = ({ id, comments, profileName, postImage, description, likesCount, liked, disabledSendingForm, toggleLike, toggleCommentLike, onSend }) => {
    console.log('render POST ' + id);
    const history = useHistory();

    const goToPost = useCallback(() => {
        history.push(`/post/${id}`)
    }, [history, id]);

    return (
        <PostWrapper>
            <PostHeader profileName={profileName}
                        avatar={ avatar }
                        additionalInfo='Omsk, Russia'/>

            <div className='post-content'>
                <PostImage src={ postImage }/>
            </div>

            <div className='post-actions'>
                <PostActions liked={liked} goToPost={goToPost} onLike={toggleLike}/>

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
                                     comments={comments}/>
                </div>

                <CommentSender disabled={disabledSendingForm} onSend={onSend}/>
            </div>
        </PostWrapper>
    );
};

const selectFirstTwoComments = createSelector(
    (state, ownState) => state.posts.list[ownState.id].commentsIds,
    (state) => state.comments.list,
    (commentsIds, commentsList) => commentsIds
        .filter(Boolean)
        .slice(0, 2)
        .map((id) => commentsList[id]),
);

const mapStateToProps = (state, ownState) => {
    const post = state.posts.list[ownState.id];
    return {
        comments: selectFirstTwoComments(state, ownState),
        id: post.id,
        profileName: post.author,
        postImage: post.imgSrc,
        description: post.description,
        likesCount: post.likesCount,
        liked: post.liked,
        disabledSendingForm: post.disabledSendingForm,
    }
};

const mapDispatchToProps = (dispatch, ownState) => ({
    toggleLike: () => {
        dispatch(togglePostLike(ownState.id))
    },
    toggleCommentLike: (commentId) => {
        dispatch(toggleCommentLikeAction(commentId))
    },
    onSend: (text) => {
        const newComment = {
            profileName: `admin`,
            text: text,
            postId: ownState.id,
        };
        dispatch(sendCommentStarted(newComment));
    },
});

export const PostConnect = connect(mapStateToProps, mapDispatchToProps)(MemoDecorator(Post));

export default Post;
