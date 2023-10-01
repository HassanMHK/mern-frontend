import { useState } from "react"
import { useRegister } from "../hooks/useRegister";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {register, isLoading, error} = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(email, password)
    }

    return(
        <div className="register-container">
            <form className="register" onSubmit={handleSubmit}>
                <div className="form-title">
                    <h1>Sign Up</h1>
                </div>
                <div className="form-inputs">
                    <label>Email:</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <label>Password:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                </div>
                <div className="form-buttons">
                    <button type="submit" disabled={isLoading}>Sign up</button>
                </div>
                {error && <div className="form-error">
                    <p>{error}</p>
                </div>}
            </form>
        </div>
    );

}

export default Register