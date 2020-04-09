import React, {useEffect, useState} from 'react';
import Post from "../components/post/Post";
import { useDispatch, useSelector } from "react-redux";
import {getPosts} from "../actions/postsActions";

function HomePage() {
    const [ page, setPage ] = useState(4);
    const { loading, list, allIds } = useSelector(state => state.homePage.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts(page));
    },[dispatch, page]);

    const onLoadMorePosts = () => {
        setPage(page + 1);
    };

    return (
        <div className="App">
            {allIds.map((id) => list[id])
                .map(({ id }) => <Post id={id} key={id}/>)}
            {
                loading
                    ? <div> Загрузка </div>
                    : <button onClick={onLoadMorePosts}>Загрузить больше публикаций </button>
            }
        </div>
    );
}

export default HomePage;
