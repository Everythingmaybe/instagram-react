import React from "react";
import Comment from "./Comment";

const CommentsWrapper = ({ comments, toggleCommentLike }) => {
    return (
        <div className="post-comments">
            {
                comments.map((comment, index) => (
                    <Comment {...comment}
                             toggleCommentLike={toggleCommentLike}
                             key={index}/>
                ))
            }
        </div>
    );
};

export default CommentsWrapper;
