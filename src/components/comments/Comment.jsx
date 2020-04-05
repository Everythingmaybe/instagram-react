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

const Comment = ({ profile, text, liked }) => {
    return (
        <PostComment>
            <PostCommentText>
                <a href="#">{ profile }</a> <span>{ text }</span>
            </PostCommentText>
            <LikeButton small={true} className='no-padding'/>
        </PostComment>
    );
};

export default Comment;
