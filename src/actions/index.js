import {GET_POSTS_FAILED, GET_POSTS_STARTED, GET_POSTS_SUCCESS} from "../constans/actionTypes";

export const getPostStarted = () => {
    return { type: GET_POSTS_STARTED }
};

export const getPostsSuccess = (posts) => {
    return { type: GET_POSTS_SUCCESS, payload: posts }
};

export const getPostsFailed = () => {
    return { type: GET_POSTS_FAILED, payload: [] }
};

export const getPosts = (page = 0) => dispatch => {
    dispatch(getPostStarted());
    fetch(`https://picsum.photos/v2/list?page=${page}`)
        .then((res) => res.json())
        .then((postsList) => postsList.map(({id, author, download_url}) => ({
            id,
            author,
            download_url,
            description: 'Some description',
            comments: [],
            likesCount: Math.ceil((Math.random() * 1000000)),
        })))
        .then((posts) => dispatch(getPostsSuccess(posts)))
        .catch(() => dispatch(getPostsFailed()))
};
