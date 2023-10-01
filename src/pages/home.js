import { useState, useEffect } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import Post from '../components/post'
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
    const {posts, dispatch} = usePostsContext();
    const [inputs, setInputs] = useState({title: "", text: ""});
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            // setPostsData(json);

            if(response.ok){
                // setPostsData(json);
                dispatch({type: 'SET_POSTS', payload: json});
            }
        }
        if(user){
            fetchPosts();
        }
    }, [dispatch, user]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        // console.log(JSON.stringify(inputs));
    }
    
    const newPost = async (event) => {
        event.preventDefault();

        if(!user){
            setError('You must be Logged in')
            return
        }
        const response = await fetch('/api/posts',  {
            method: "POST",
            body: JSON.stringify(inputs),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if(!response.ok){
            console.log(json.error);
        }
        if(response.ok){
            dispatch({type: 'CREATE_POST', payload: json});
            setInputs({title: "", text: ""});
        }
    }

    return(
        <div className="home-container">
            <div className="new-post">
                <h2>Create a new post</h2>
                <form>
                    <label>
                        <input className="new-post-title"
                        type="text" 
                        name="title"
                        placeholder="Enter a title"
                        autoComplete="off"
                        required
                        value={inputs.title || ""} 
                        onChange={handleChange}
                        />
                    </label>
                    <label>
                        <textarea className="new-post-text" name="text" 
                        rows="4" cols="50" placeholder="What's on your mind ?" 
                        autoComplete="off"
                        required
                        value={inputs.text || ""} 
                        onChange={handleChange}
                        />
                    </label>
                    <button className="new-post-button" onClick={newPost}>Post</button>
                </form>
            </div>
            <div className="posts-list">
                {posts && posts.map((post) => {
                    return(
                        <Post {...post} key={post._id} />
                    )
                })}
            </div>
        </div>
    );

}

export default Home;