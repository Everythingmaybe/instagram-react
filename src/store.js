import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import {createEpicMiddleware} from "redux-observable";
import rootEpic from "./epics";

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);
export default store;
