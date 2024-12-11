// import React, { useState } from "react";
// import "../App.css";

// export default function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [message, setMessage] = useState(""); // To show success or error messages

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setMessage(""); // Clear any previous messages

//         fetch("http://127.0.0.1:5000/login", {
//             method: "POST",
//             crossDomain: true,
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 "Access-Control-Allow-Origin": "*",
//             },
//             body: JSON.stringify({
//                 email,
//                 password,
//             }),
//         })
//             .then((res) => {
//                 if (!res.ok) {
//                     // Handle HTTP errors
//                     return res.json().then((data) => {
//                         throw new Error(data.error || "Login failed");
//                     });
//                 }
//                 return res.json(); // Parse response JSON
//             })
//             .then((data) => {
//                 console.log(data, "userLogin");
//                 alert("Login successful");

//                 // Save token and user details to localStorage
//                 const { token } = data;
//                 window.localStorage.setItem("token", token);
//                 window.localStorage.setItem("email", email);
//                 window.localStorage.setItem("loggedIn", true);

//                 // Redirect to the user details page
//                 window.location.href = "./userDetails";
//             })
//             .catch((error) => {
//                 console.error("Error during login:", error.message);
//                 setMessage(error.message); // Display error message
//             });
//     };

//     return (
//         <div className="auth-wrapper">
//             <div className="auth-inner">
//                 <form onSubmit={handleSubmit}>
//                     <h3>Login</h3>

//                     {message && (
//                         <div
//                             className={`alert ${message.includes("successful")
//                                 ? "alert-success"
//                                 : "alert-danger"
//                                 }`}
//                         >
//                             {message}
//                         </div>
//                     )}

//                     <div className="mb-3">
//                         <label>Email address</label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             placeholder="Enter email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="mb-3">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             placeholder="Enter password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="d-grid">
//                         <button type="submit" className="btn btn-primary">
//                             Submit
//                         </button>
//                     </div>
//                     <p className="forgot-password text-right">
//                         <a href="/register">Register</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// }
import React, { useState } from "react";
import "../App.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // For success or error messages

    // Handle form submission for email/password login
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages

        fetch("https://render-flask-2yo0.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((data) => {
                        throw new Error(data.error || "Login failed");
                    });
                }
                return res.json(); // Parse the response JSON
            })
            .then((data) => {
                alert("Login successful");

                // Save user data to localStorage
                const { token } = data;
                window.localStorage.setItem("token", token);
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("loggedIn", true);

                // Redirect to user details page
                window.location.href = "./userDetails";
            })
            .catch((error) => {
                setMessage(error.message); // Show error message
            });
    };

    // Handle GitHub OAuth login
    const handleGitHubLogin = () => {
        // Redirect to the backend GitHub OAuth route
        window.location.href = "https://render-flask-2yo0.onrender.com//login/github";
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>Login</h3>

                    {/* Display messages */}
                    {message && (
                        <div
                            className={`alert ${message.includes("successful") ? "alert-success" : "alert-danger"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    {/* Email and Password Login Form */}
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>

                    {/* GitHub Login Button */}
                    <div className="d-grid mb-3">
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={handleGitHubLogin}
                        >
                            Login with GitHub
                        </button>
                    </div>

                    <p className="forgot-password text-right">
                        <a href="/register">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
}


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Updated import

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate(); // Updated to useNavigate

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError("");

//         try {
//             const response = await axios.post("http://127.0.0.1:5000/login", {
//                 email,
//                 password,
//             });
//             localStorage.setItem("token", response.data.token); // Store token in local storage
//             navigate("/dashboard"); // Use navigate instead of history.push
//         } catch (err) {
//             setError("Invalid credentials");
//         }
//     };

//     const handleGitHubLogin = () => {
//         window.location.href = "http://127.0.0.1:5000/login/github";
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//                 <button type="submit">Login</button>
//             </form>

//             <button onClick={handleGitHubLogin}>Login with GitHub</button>
//         </div>
//     );
// };



// export default Login;
