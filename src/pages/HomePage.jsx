import React, {useEffect} from 'react';
import Post from "../components/post/Post";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../actions";

function HomePage() {
    const { loading, posts } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    },[dispatch])

    return (
        <div className="App">
            {
                loading
                ? <div> Загрузка </div>
                : posts.map(({
                                 author,
                                 download_url,
                                 id,
                                 description,
                                 comments,
                                 likesCount
                             }) => <Post profileName={author}
                                         postImage={download_url}
                                         description={description}
                                         comments={comments}
                                         likesCount={likesCount}
                                         key={id}/>)
            }
        </div>
    );
}

export default HomePage;
