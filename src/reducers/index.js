import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import commentsReducer from "./commentsReducer";

const rootReducer = combineReducers({
    homePage: combineReducers({
        posts: postsReducer,
        comments: commentsReducer,
    }),
});

export default rootReducer;
