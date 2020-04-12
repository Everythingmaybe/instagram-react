import React from "react";
import styled from "styled-components";
import LikeButton from "../buttons/LikeButton";
import {MemoDecorator} from "../../containers/decorators";

const PostComment = styled.div`
    display: flex;
    margin-bottom: 4px;
`;

const PostCommentText = styled.div`
    flex-grow: 1;
`;

const Comment = MemoDecorator(({ id, profileName, text, liked, isDescription, toggleCommentLike }) => {
    console.log('render Comment');
    const toggleLike = () => {
        toggleCommentLike(id)
    };

    return (
        <PostComment>
            <PostCommentText>
                <a href="/">{ profileName }</a> <span>{ text }</span>
            </PostCommentText>
            {
                !isDescription
                    ? <LikeButton small={true}
                                  className='no-padding'
                                  liked={liked}
                                  onClick={toggleLike}/>
                    : ''
            }

        </PostComment>
    );
});

export default Comment;
