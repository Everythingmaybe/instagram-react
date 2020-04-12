import React from "react";
import Comment from "./Comment";
import {MemoDecorator} from "../../containers/decorators";

const CommentsWrapper = MemoDecorator(({ comments, toggleCommentLike }) => {
    console.log('render CommentsWrapper');
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
});

export default CommentsWrapper;
