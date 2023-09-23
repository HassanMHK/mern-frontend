import { PostsContext } from "../context/postContext";
import { useContext } from "react";

export const usePostsContext = () => {
    const context = useContext(PostsContext);

    if(!context){
        throw Error('usePostsContext not used properly');
    }

    return context;
}