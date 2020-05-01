import { getCommentsSuccess } from "./commentsActions";
import { generateComments, normalizePosts } from "../commonFuncs";

export const GET_POSTS_STARTED  = 'GET_POSTS_STARTED ';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED';
export const TOGGLE_POST_LIKE = 'TOGGLE_POST_LIKE';

export const getPostStarted = (pageCount) => {
    return { type: GET_POSTS_STARTED, payload: pageCount }
};

export const getPostsSuccess = (posts) => {
    return { type: GET_POSTS_SUCCESS, payload: posts }
};

export const getPostsFailed = () => {
    return { type: GET_POSTS_FAILED }
};

export const togglePostLike = (id) => {
    return { type: TOGGLE_POST_LIKE, payload: id }
};

export const getPosts = (page = 0) => dispatch => {
    dispatch(getPostStarted());
    fetch(`https://picsum.photos/v2/list?page=${page}`)
        .then((res) => res.json())
        .then((res) => res.map((post) => ({ ...post, comments: generateComments() })))
        .then((posts) => normalizePosts(posts))
        .then(({ posts, comments }) => {
            dispatch(getPostsSuccess(posts));
            dispatch(getCommentsSuccess(comments));
        })
        // .catch((e) => dispatch(getPostsFailed(e)))
};
