import { usePostsContext } from "../hooks/usePostsContext";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Post = (props) => {
    const { title, text, _id } = props;
    const {dispatch} = usePostsContext();
    const [inputs, setInputs] = useState({title: "", text: ""});
    const [edited, setEdited] = useState(false);
    const { user } = useAuthContext();

    const deletePost = async () => {

        if(!user){
            return
        }
        const response = await fetch('/api/posts/'+_id,  {
            method: "DELETE",
        });
        
        const json = await response.json();

        if(!response.ok){
            console.log(json.error);
        }
        if(response.ok){
            dispatch({type: 'DELETE_POST', payload: json});
        }    
    }

    const editPost = async () => {

        if(!user){
            return
        }

        if(inputs.title === ""){
            inputs.title = title;
        }
        if(inputs.text === ""){
            inputs.text = text;
        }
        const response = await fetch('/api/posts/'+_id,  {
            method: "PATCH",
            body: JSON.stringify(inputs),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        
        const json = await response.json();

        if(!response.ok){
            console.log(json.error);
        }
        if(response.ok){
            dispatch({type: 'UPDATE_POST', payload: json});
        }   
        setEdited(false);
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        // console.log(JSON.stringify(inputs));
    }
    const editPostShow = () => {
        setEdited(true);
    }

    return (
        <div className="post-card">
            {!edited && <div className="post-container">
                <h3>{title}</h3>
                <p className="post-text">{text}</p>
                <div className="post-btns">
                    <button className="post-edit-btn" onClick={editPostShow}><span className="material-symbols-outlined">edit_square</span></button>
                    <button className="post-delete-btn" onClick={deletePost}><span className="material-symbols-outlined">delete</span></button>
                </div>
            </div>}
            {edited && <div className="edit-post-container">
                <input className="edit-post-title"
                    type="text" 
                    name="title"
                    placeholder="Enter a title"
                    autoComplete="off"
                    required
                    value={inputs.title || title} 
                    onChange={handleChange}
                />
                <textarea className="edit-post-text" name="text" 
                    rows="4" cols="50" placeholder="What's on your mind ?" 
                    autoComplete="off"
                    required
                    value={inputs.text || text} 
                    onChange={handleChange}
                />
                <div className="edit-btns">
                    <button className="edit-post-button" onClick={editPost}><a>Edit</a></button>
                    <button className="edit-cancel-button" onClick={() => {setEdited(false)}}><a>cancel</a></button>
                </div>
            </div>}
        </div>
    );

}

export default Post;