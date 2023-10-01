import { useAuthContext } from './useAuthContext'
import { usePostsContext } from './usePostsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    // rename dispatch as postsDispatch
    const { dispatch: postsDispatch } = usePostsContext();

    const logout = async () => {
        // remove user from local storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({type: 'LOGOUT'});
        // clear global posts state when logout
        postsDispatch({type: 'SET_POSTS', payload: null});
    }

    return { logout }
}