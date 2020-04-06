import {GET_POSTS_FAILED, GET_POSTS_STARTED, GET_POSTS_SUCCESS} from "../constans/actionTypes";

const initialState = {
    loading: false,
    posts: [],
};

export const postListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return { ...state, loading: true };
        case GET_POSTS_FAILED:
            return { ...state, loading: false };
        case GET_POSTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                posts: action.payload,
            };
        }
        default:
            return state;
    }
};
