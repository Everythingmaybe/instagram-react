export const GET_POSTS_STARTED  = 'GET_POSTS_STARTED ';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED';
export const GET_MORE_POSTS_SUCCESS = 'GET_MORE_POSTS_SUCCESS';

export const getPostStarted = () => {
    return { type: GET_POSTS_STARTED }
};

export const getPostsSuccess = (posts) => {
    return { type: GET_POSTS_SUCCESS, payload: posts }
};

export const getMorePostsSuccess = (posts) => {
    return { type: GET_MORE_POSTS_SUCCESS, payload: posts }
}

export const getPostsFailed = () => {
    return { type: GET_POSTS_FAILED }
};

const mapPost = ({ id, author, download_url: imgSrc, likesCount = 0, description = 'Some description' }) => {
    return { id, author, imgSrc, likesCount, description };
};

const normilizePosts = (posts) => {
    return posts.reduce((result, post) => {
        return {
            list: {
                ...result.list,
                [post.id]: mapPost(post),
            },
            allIds: [...result.allIds, post.id],
        };
    }, { allIds: [] });
};

export const getPosts = (page = 0) => dispatch => {
    dispatch(getPostStarted());
    fetch(`https://picsum.photos/v2/list?page=${page}`)
        .then((res) => res.json())
        .then((posts) => normilizePosts(posts))
        .then((postsList) => dispatch(getMorePostsSuccess(postsList)))
        .catch((e) => dispatch(getPostsFailed(e)))
};
