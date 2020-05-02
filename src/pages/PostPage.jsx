import React from "react";
import styled from "styled-components";

import {PostConnect} from "../components/post/Post";

const PostWrapper = styled.div`
    max-width: 800px;
    margin: 50px auto;
`;

const PostPage = ({ match }) => {
    const { id } = match.params;
    return (
        <PostWrapper>
            <PostConnect id={ id }></PostConnect>
        </PostWrapper>
    );
};

export default PostPage;
