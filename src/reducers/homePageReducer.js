import {GET_MORE_POSTS_SUCCESS, GET_POSTS_FAILED, GET_POSTS_STARTED, GET_POSTS_SUCCESS} from "../actions/postsActions";
import { GET_COMMENTS_SUCCESS } from "../actions/commentsActions";
import {combineReducers} from "redux";

const initialState = {
    loading: false,
    list: {},
    allIds: [],
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return { ...state, loading: true };
        case GET_POSTS_FAILED:
            return { ...state, loading: false };
        case GET_POSTS_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        }
        case GET_MORE_POSTS_SUCCESS:
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
        default:
            return state;
    }
};

const commentsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_COMMENTS_SUCCESS:
            return { ...state, comments: action.payload };
        default:
            return state;
    }
};

const homePageReducer = combineReducers({
    posts: postsReducer,
    comments: commentsReducer,
});

export default homePageReducer;
