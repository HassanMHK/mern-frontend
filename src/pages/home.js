import { useState, useEffect } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import Post from '../components/post'

const Home = () => {
    const {posts, dispatch} = usePostsContext();
    const [inputs, setInputs] = useState("");

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch('/api/posts');
            const json = await response.json();
            // setPostsData(json);

            if(response.ok){
                // setPostsData(json);
                dispatch({type: 'SET_POSTS', payload: json});
            }
        }
        getPosts();
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        // console.log(JSON.stringify(inputs));
    }
    
    const newPost = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/posts',  {
            method: "POST",
            body: JSON.stringify(inputs),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        const json = await response.json();

        if(!response.ok){
            console.log(json.error);
        }
        if(response.ok){
            dispatch({type: 'CREATE_POST', payload: json});
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
                {/* <div className="post-card">
                    <h3>Where does it come from?</h3>
                    <p className="post-text">Contrary to pold. Rey College Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                </div>
                <div className="post-card">
                    <h3>Where does it come from?</h3>
                    <p className="post-text">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                </div>
                <div className="post-card">
                    <h3>Where does it come from?</h3>
                    <p className="post-text">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                </div>
                <div className="post-card">
                    <h3>Where does it come from?</h3>
                    <p className="post-text">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                </div>
                <div className="post-card">
                    <h3>Where does it come from?</h3>
                    <p className="post-text">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                </div>
                <div className="post-card">
                    <h3>Where does it come from?</h3>
                    <p className="post-text">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                </div>
                <div className="post-card">
                    <h3>Where does it come from?</h3>
                    <p className="post-text">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                </div> */}
            </div>
        </div>
    );

}

export default Home;