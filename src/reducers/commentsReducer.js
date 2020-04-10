import * as immutable from 'object-path-immutable';

import {
    DISABLE_SEND_FORM,
    ENABLE_SEND_FORM,
    GET_COMMENTS_SUCCESS,
    SEND_COMMENT_SUCCESS, TOGGLE_COMMENT_LIKE
} from "../actions/commentsActions";

const commentsInitialState = {
    list: {},
    allIds: [],
    disabledSendingPostsIds: [],
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
        case DISABLE_SEND_FORM:
            return immutable.push(state,'disabledSendingPostsIds', action.payload);
        case ENABLE_SEND_FORM:
            const index = state.disabledSendingPostsIds
                .findIndex((id) => id === action.payload);
            return immutable.del(state, `disabledSendingPostsIds.${index}`);
        case TOGGLE_COMMENT_LIKE:
            return immutable.update(state, `list.${action.payload}.liked`, value => !value);
        default:
            return state;
    }
};

export default commentsReducer;
