import {combineEpics} from "redux-observable";
import { getPostsEpic } from "./postsEpics";
import {sendCommentEpic} from "./commentsEpics";

const rootEpic = combineEpics(
    getPostsEpic,
    sendCommentEpic
);

export default rootEpic;
