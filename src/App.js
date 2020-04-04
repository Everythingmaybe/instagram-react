import React, {useEffect, useState} from 'react';
import './App.css';

import Post from "./components/post/Post";

function App() {
    const [ postsList, setPostsList ] = useState([]);

    // TODO: Move all getting/setting to Redux
    useEffect(() => {
        (async () => {
            const response = await fetch(
                'https://picsum.photos/v2/list',
            );
            const postsList = await response.json();
            const mappedPostsList = postsList.map(({ id, author, download_url }) => ({
                id,
                author,
                download_url,
            }));
            setPostsList(mappedPostsList);
        })()
    });

  return (
    <div className="App">
        {
            postsList.map(({ author, download_url, id }) => <Post profileName={author}
                                                                  postImage={download_url}
                                                                  key={id}/>)
        }
    </div>
  );
}

export default App;
