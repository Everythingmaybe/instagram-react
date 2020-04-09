import {getCommentsSuccess} from "./commentsActions";
import {uniqueId} from "../commonFuncs";

export const GET_POSTS_STARTED  = 'GET_POSTS_STARTED ';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED';
export const TOGGLE_POST_LIKE = 'TOGGLE_POST_LIKE';

export const getPostStarted = () => {
    return { type: GET_POSTS_STARTED }
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

const mapPost = ({ id, author, download_url: imgSrc, likesCount = 0, description = 'Some description', liked = false }) => {
    return { id, author, imgSrc, likesCount, description, liked };
};

const generateComments = () => {
    const commentsLength = parseInt(Math.random() * 100);
    return Array(commentsLength)
        .fill(undefined)
        .map((_, key) => ({
            id: uniqueId(),
            profileId: 0,
            profileName: `test_user#${key}`,
            text: `some text test_user #${key}`,
            liked: false,
        }));
};

const normalizeComments = (post) => {
    const comments = post.comments.reduce((result, comment) => {
        return {
            list: {
                ...result.list,
                [comment.id]: {
                    ...comment,
                    postId: post.id,
                },
            },
            allIds: [...result.allIds, comment.id],
        };
    }, {
        list: {},
        allIds: [],
    });

    return { comments, commentsIds: [...comments.allIds] };
};

const normalizePosts = (posts) => {
    let normalizedComments = { list: {}, allIds: [] };
    const normalizedPosts = posts.reduce((result, post) => {
        const { comments, commentsIds } = normalizeComments(post);
        normalizedComments = {
            ...normalizedComments,
            list: {
                ...normalizedComments.list,
                ...comments.list,
            },
            allIds: [
                ...normalizedComments.allIds,
                ...comments.allIds,
            ],
        };

        return {
            list: {
                ...result.list,
                [post.id]: {
                    ...mapPost(post),
                    commentsIds,
                },
            },
            allIds: [...result.allIds, post.id],
        };
    }, {
        list: {},
        allIds: [],
    });

    return { posts: normalizedPosts, comments: normalizedComments };
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
