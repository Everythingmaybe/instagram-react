import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import PostPage from "./pages/PostPage";
import {Provider} from "react-redux";
import store from "./store";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <Provider store={ store }>
            <Router>
                <Route path='/'
                       exact
                       component={ HomePage }/>
                <Route path='/post/:id'
                       component={ PostPage }/>
            </Router>
        </Provider>
    );
}

export default App;
