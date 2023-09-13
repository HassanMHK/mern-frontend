
const Post = (props) => {
    const { title, text, _id, del } = props;

    const deletePost = () => {
        del(_id);
        // return 
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