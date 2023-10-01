import { useState } from "react"
import axios from 'axios';
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/user/login', {email, password}, {
                headers:{
                    'Content-Type': 'application/json',
                }
            });
            
            // store user to local storage
            localStorage.setItem('user', JSON.stringify(response.data))
                
            // update Auth state
            dispatch({type: 'LOGIN', payload: response.data});
            setIsLoading(false);
        } catch (error) {
            // console.log(error.response.data.error);
            setError(error.response.data.error);
            setIsLoading(false);
        }
    }
    return { login, isLoading, error}
}