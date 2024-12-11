import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the local storage
        window.localStorage.removeItem("loggedIn");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("token");

        // Update state to reflect logout
        setIsLoggedIn(false); // This will set isLoggedIn to false and re-render

        // Redirect to login page
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                {!isLoggedIn ? (
                    <>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link to="/userDetails" className="nav-link">
                                User Details
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/updateuser" className="nav-link">
                                update User Details
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/products" className="nav-link">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </>
                )}
                <li className="nav-item">
                    <Link to="/about" className="nav-link">
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
