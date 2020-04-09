import { GET_POSTS_FAILED, GET_POSTS_STARTED, GET_POSTS_SUCCESS, TOGGLE_POST_LIKE } from "../actions/postsActions";
import { SEND_COMMENT_SUCCESS } from "../actions/commentsActions";

const postsInitialState = {
    loading: false,
    list: {},
    allIds: [],
};

const postsReducer = (state = postsInitialState, action) => {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return { ...state, loading: true };
        case GET_POSTS_FAILED:
            return { ...state, loading: false };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    ...action.payload.list,
                },
                allIds: [
                    ...state.allIds,
                    ...action.payload.allIds,
                ],
                loading: false,
            };
        case TOGGLE_POST_LIKE:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload]: {
                        ...state.list[action.payload],
                        liked: !state.list[action.payload].liked,
                    },
                },
            };
        // TODO: Можно ли так делать один экшен находится в двух редьюсерах
        case SEND_COMMENT_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.postId]: {
                        ...state.list[action.payload.postId],
                        commentsIds: [
                            action.payload.id,
                            ...state.list[action.payload.postId].commentsIds,
                        ],
                    }
                }
            };
        default:
            return state;
    }
};

export default postsReducer;
