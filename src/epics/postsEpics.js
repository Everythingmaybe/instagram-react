import {filter, map, mergeMap, switchMap} from "rxjs/operators";
import {GET_POSTS_STARTED, getPostsSuccess} from "../actions/postsActions";
import {generateComments, normalizePosts} from "../commonFuncs";
import {getCommentsSuccess} from "../actions/commentsActions";
import {fromPromise} from "rxjs/internal-compatibility";
import {of} from "rxjs";

export const getPostsEpic = action$ => action$.pipe(
    filter(action => action.type === GET_POSTS_STARTED),
    switchMap((action) => fromPromise(fetch(`https://picsum.photos/v2/list?page=${action.payload}`)
        .then((res) => res.json())
    )),
    map((res) => res.map((post) => ({ ...post, comments: generateComments() }))),
    map((posts) => normalizePosts(posts)),
    mergeMap(({ posts, comments }) => of(
        getPostsSuccess(posts),
        getCommentsSuccess(comments)
    ))
);
