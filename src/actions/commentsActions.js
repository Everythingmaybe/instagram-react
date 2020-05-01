export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const SEND_COMMENT_STARTED = 'SEND_COMMENT_STARTED';
export const SEND_COMMENT_SUCCESS = 'SEND_COMMENT_SUCCESS';
export const SEND_COMMENT_FAILED = 'SEND_COMMENT_FAILED';
export const TOGGLE_COMMENT_LIKE = 'TOGGLE_COMMENT_LIKE';
export const DISABLE_SEND_FORM = 'DISABLE_SEND_FORM';
export const ENABLE_SEND_FORM = 'ENABLE_SEND_FORM';

export const getCommentsSuccess = (comments) => {
    return { type: GET_COMMENTS_SUCCESS, payload: comments };
};

export const toggleCommentLike = (id) => {
    return { type: TOGGLE_COMMENT_LIKE, payload: id }
};

export const sendCommentStarted = (comment) => {
    return { type: SEND_COMMENT_STARTED, payload: comment };
};

export const sendCommentSuccess = (comment) => {
    return { type: SEND_COMMENT_SUCCESS, payload: comment }
};

export const disableSendForm = (postId) => {
    return { type: DISABLE_SEND_FORM, payload: postId };
};

export const enableSendForm = (postId) => {
    return { type: ENABLE_SEND_FORM, payload: postId };
};
