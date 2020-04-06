import {postListReducer} from "./reducers";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

const store = createStore(postListReducer, applyMiddleware(thunk));

export default store;
