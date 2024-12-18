import React, {useCallback, useEffect, useState} from 'react';
import { PostConnect } from "../components/post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPostStarted } from "../actions/postsActions";

const HomePage = () => {
    const [ page, setPage ] = useState(1);
    const { loading, allIds } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    console.log('render HomePage');
    useEffect(() => {
        if (!allIds.length) {
            dispatch(getPostStarted(page));
        }
    },[dispatch, page, allIds]);

    const onLoadMorePosts = useCallback(() => {
        setPage(page + 1);
        dispatch(getPostStarted(page));
    }, [page, setPage, dispatch]);

    return (
        <div className="App">
            {
                loading
                    ? <div> Загрузка </div>
                    : <button onClick={onLoadMorePosts}>Загрузить больше публикаций </button>
            }
            {allIds.map((id, index) => <PostConnect id={id} key={index}/>)}
        </div>
    );
};

export default HomePage;
