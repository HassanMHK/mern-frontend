import { useState } from "react"
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, error} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password)
    }

    return(
        <div className="login-container">
            <form className="login" onSubmit={handleSubmit}>
                <div className="form-title">
                    <h1>Log in</h1>
                </div>
                <div className="form-inputs">
                    <label>Email:</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <label>Password:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                </div>
                <div className="form-buttons">
                    <button type="submit" disabled={isLoading}>Log in</button>
                </div>
                {error && <div className="form-error">
                    <p>{error}</p>
                </div>}
            </form>
        </div>
    );

}

export default Login