import React, {useEffect, useRef, useState} from 'react';
import './App.css';

import Post from "./components/post/Post";

function App() {
    const [postsList, setPostsList] = useState([]);

    // TODO: Move all getting/setting to Redux
    useEffect(() => {
        (async () => {
            const response = await fetch(
                'https://picsum.photos/v2/list?page=3',
            );
            const postsList = await response.json();
            const mappedPostsList = postsList.map(({id, author, download_url}) => ({
                id,
                author,
                download_url,
                description: 'Some description',
                comments: [],
                likesCount: Math.ceil((Math.random() * 1000000)),
            }));
            setPostsList(mappedPostsList);
        })()
    }, []);

    return (
        <div className="App">
            {
                postsList.map(({
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

export default App;
