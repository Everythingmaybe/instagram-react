import {delay, filter, mergeMap, tap} from "rxjs/operators";
import {
    disableSendForm, enableSendForm,
    SEND_COMMENT_STARTED,
    sendCommentSuccess
} from "../actions/commentsActions";
import {of} from "rxjs";
import {uniqueId} from "../commonFuncs";

export const sendCommentEpic = action$ => action$.pipe(
    filter(action => action.type === SEND_COMMENT_STARTED),
    tap(action => disableSendForm(action.payload.postId)),
    delay(1000),
    mergeMap(({ payload: comment }) => of(
        sendCommentSuccess({
            ...comment,
            id: uniqueId(),
            liked: false,
        }),
        enableSendForm(comment.postId)
    ))
);
