import * as immutable from 'object-path-immutable';

import {
    GET_COMMENTS_SUCCESS,
    SEND_COMMENT_SUCCESS, TOGGLE_COMMENT_LIKE
} from "../actions/commentsActions";

// const commentInitialState = {
//     id: null,
//     profileId: null,
//     profileName: null,
//     text: null,
//     liked: false,
// };

const commentsInitialState = {
    list: {},
    allIds: [],
};

const commentsReducer = (state = commentsInitialState, action) => {
    switch (action.type) {
        case GET_COMMENTS_SUCCESS:
            return immutable
                .wrap(state)
                .merge('list', action.payload.list)
                .push('allIds', ...action.payload.allIds)
                .value();
        case SEND_COMMENT_SUCCESS:
            return immutable
                .wrap(state)
                .set(`list.${action.payload.id}`, action.payload)
                .insert('allIds', action.payload.id, 0)
                .value();
        case TOGGLE_COMMENT_LIKE:
            return immutable.update(state, `list.${action.payload}.liked`, value => !value);
        default:
            return state;
    }
};

export default commentsReducer;
