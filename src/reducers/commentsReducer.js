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
            return {
                ...state,
                list: {
                    ...state.list,
                    ...action.payload.list
                },
                allIds: [
                    ...state.allIds,
                    ...action.payload.allIds,
                ],
            };
        case SEND_COMMENT_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.id]: action.payload
                },
                allIds: [
                    action.payload.id,
                    ...state.allIds,
                ],
            };
        case DISABLE_SEND_FORM:
            return {
                ...state,
                disabledSendingPostsIds: [
                    ...state.disabledSendingPostsIds,
                    action.payload,
                ],
            };
        case ENABLE_SEND_FORM:
            return {
                ...state,
                disabledSendingPostsIds: state.disabledSendingPostsIds.filter(id => id !== action.payload),
            };
        case TOGGLE_COMMENT_LIKE:
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
        default:
            return state;
    }
};

export default commentsReducer;
