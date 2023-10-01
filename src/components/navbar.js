import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogoutClick = () => {
        logout();
    }

    return (
        <header className="nav-container">
            <div className="first-navbar">
                <div className="nav-logo">
                    <Link to={"/"}>Post</Link>
                </div>
                <nav className="nav-login-signup">
                    {!user && <div>
                        <Link to={"/login"}>Login</Link>
                        <Link to={"/register"}>Signup</Link>
                    </div>}
                    {user && <div className="user-logout-container">
                        <span>{user.email}</span>
                        <button className="nav-logout" onClick={handleLogoutClick}>Log out</button>
                    </div>}
                </nav>
            </div>
            <div className="second-navbar">

            </div>  
        </header>
    );

}

export default Navbar;