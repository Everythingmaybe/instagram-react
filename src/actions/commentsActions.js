export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const SEND_COMMENT_STARTED = 'SEND_COMMENT_STARTED';
export const SEND_COMMENT_SUCCESS = 'SEND_COMMENT_SUCCESS';
export const SEND_COMMENT_FAILED = 'SEND_COMMENT_FAILED';

const getCommentsSuccess = (comments) => {
    return { type: GET_COMMENTS_SUCCESS, payload: comments };
};
