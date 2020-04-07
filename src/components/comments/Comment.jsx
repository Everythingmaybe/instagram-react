import React from "react";
import styled from "styled-components";
import LikeButton from "../buttons/LikeButton";

const PostComment = styled.div`
    display: flex;
    margin-bottom: 4px;
`;

const PostCommentText = styled.div`
    flex-grow: 1;
`;

const Comment = ({ id, profile, text, liked, isDescription, toggleCommentLike }) => {
    const toggleLike = () => {
        toggleCommentLike(id)
    };

    return (
        <PostComment>
            <PostCommentText>
                <a href="/">{ profile }</a> <span>{ text }</span>
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
};

export default Comment;
