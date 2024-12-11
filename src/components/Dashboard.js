import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get the token and username from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const username = urlParams.get("username");

        if (token && username) {
            // Store token and username in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            setUsername(username);
        } else {
            // Redirect to login if token or username is missing
            navigate("/about");
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear localStorage on logout
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        // Redirect to login page
        navigate("/");
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {username ? (
                <div>
                    <p>Welcome, {username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
