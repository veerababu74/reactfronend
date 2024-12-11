// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const GitHubRedirectHandler = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const handleRedirect = () => {
//             // Extract token and username from URL parameters
//             const urlParams = new URLSearchParams(window.location.search);
//             const tokenFromUrl = urlParams.get("token");
//             const username = urlParams.get("username");

//             if (tokenFromUrl && username) {
//                 // Store token and username in localStorage
//                 localStorage.setItem("access_token", tokenFromUrl);
//                 localStorage.setItem("username", username);

//                 // Clean up the URL (remove query params)
//                 window.history.replaceState({}, document.title, window.location.pathname);

//                 // Redirect to the dashboard
//                 navigate("/dashboard", { replace: true }); // Use replace to avoid adding to history stack
//             } else {
//                 // No token found, redirect to login
//                 navigate("/login", { replace: true });
//             }
//         };

//         handleRedirect();
//     }, []); // Empty dependency array ensures it runs only once on mount

//     return <div>Authenticating...</div>;
// };

// export default GitHubRedirectHandler;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const GitHubRedirectHandler = () => {
//     const [isRedirected, setIsRedirected] = useState(false); // Flag to prevent multiple redirects
//     const navigate = useNavigate();

//     if (!isRedirected) {
//         const urlParams = new URLSearchParams(window.location.search);
//         const tokenFromUrl = urlParams.get("token");
//         const username = urlParams.get("username");

//         if (tokenFromUrl && username) {
//             // Store token and username in localStorage
//             localStorage.setItem("access_token", tokenFromUrl);
//             localStorage.setItem("username", username);

//             // Clean up the URL
//             window.history.replaceState({}, document.title, window.location.pathname);

//             // Redirect to the dashboard
//             navigate("/dashboard", { replace: true });
//             setIsRedirected(true); // Set flag to avoid further redirection
//         } else {
//             // Redirect to login if no token or username
//             navigate("/login", { replace: true });
//             setIsRedirected(true); // Set flag to avoid further redirection
//         }
//     }

//     return <div>Authenticating...</div>;
// };

// export default GitHubRedirectHandler;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GitHubRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Extract URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");
        const username = urlParams.get("username");

        console.log("URL Params:", window.location.search); // Debugging
        console.log("Token from URL:", tokenFromUrl);
        console.log("Username from URL:", username);

        if (tokenFromUrl && username) {
            // Store token and username in localStorage
            localStorage.setItem("access_token", tokenFromUrl);
            localStorage.setItem("username", username);

            // Clean up the URL (remove query params)
            window.history.replaceState({}, document.title, window.location.pathname);

            // Navigate to the dashboard immediately after storing the token
            navigate("/dashboard", { replace: true });
        } else {
            // If no token or username is present, redirect to the login page
            navigate("/login", { replace: true });
        }
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return <div>Authenticating...</div>;
};

export default GitHubRedirectHandler;
