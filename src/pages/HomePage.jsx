import React, {useEffect, useState} from 'react';
import { PostConnect } from "../components/post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPostStarted } from "../actions/postsActions";

const HomePage = () => {
    const [ page, setPage ] = useState(1);
    const { loading, list, allIds } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    console.log('render HomePage');
    useEffect(() => {
        dispatch(getPostStarted(page));
    },[dispatch, page]);

    const onLoadMorePosts = () => {
        setPage(page + 1);
    };

    return (
        <div className="App">
            {
                loading
                    ? <div> Загрузка </div>
                    : <button onClick={onLoadMorePosts}>Загрузить больше публикаций </button>
            }
            {allIds.map((id) => list[id])
                .map(({ id }) => <PostConnect id={id} key={id}/>)}
        </div>
    );
};

export default HomePage;
