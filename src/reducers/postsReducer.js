import * as immutable from 'object-path-immutable';

import { GET_POSTS_FAILED, GET_POSTS_STARTED, GET_POSTS_SUCCESS, TOGGLE_POST_LIKE } from "../actions/postsActions";
import {DISABLE_SEND_FORM, ENABLE_SEND_FORM, SEND_COMMENT_SUCCESS} from "../actions/commentsActions";

// const postInitialState = {
//     id: null,
//     author: null,
//     imgSrc: null,
//     likesCount: null,
//     description: null,
//     liked: false,
//     disabledSendingForm: false,
// };

const postsInitialState = {
    loading: false,
    list: {},
    allIds: [],
};

// const postReducer = (state = postInitialState, action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };

const postsReducer = (state = postsInitialState, action) => {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return { ...state, loading: true };
        case GET_POSTS_FAILED:
            return { ...state, loading: false };
        case GET_POSTS_SUCCESS:
            return immutable
                .wrap(state)
                .merge('list', action.payload.list)
                .push('allIds', ...action.payload.allIds)
                .set('loading', false)
                .value();
        case TOGGLE_POST_LIKE:
            return immutable.update(state, `list.${action.payload}.liked`, value => !value);
        case SEND_COMMENT_SUCCESS:
            return immutable.insert(state,`list.${action.payload.postId}.commentsIds`, action.payload.id, 0);
        case DISABLE_SEND_FORM:
            return immutable
                .wrap(state)
                .set(`list.${action.payload}.disabledSendingForm`, true)
                .value();
        case ENABLE_SEND_FORM:
            return immutable
                .wrap(state)
                .set(`list.${action.payload}.disabledSendingForm`, false)
                .value();
        default:
            return state;
    }
};

export default postsReducer;
