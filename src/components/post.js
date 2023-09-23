import { usePostsContext } from "../hooks/usePostsContext";

const Post = (props) => {
    const { title, text, _id } = props;
    const {dispatch} = usePostsContext();

    const deletePost = async () => {

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

    return (
        <div className="post-card">
            <h3>{title}</h3>
            <p className="post-text">{text}</p>
            <button className="post-delete-btn" onClick={deletePost}><a>x</a></button>
        </div>
    );

}

export default Post;