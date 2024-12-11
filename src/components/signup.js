import React, { useState } from "react";
import "../index.css";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // To display success or error messages

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(""); // Clear any previous messages

        fetch("https://render-flask-2yo0.onrender.com/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    // Handle HTTP errors
                    return res.json().then((data) => {
                        throw new Error(data.error || "Something went wrong");
                    });
                }
                return res.json(); // Parse response JSON
            })
            .then((data) => {
                setMessage(data.message); // Display success message
                alert("Registration Successful"); // Optional alert
                setUsername("");
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                console.error("Error during registration:", error.message);
                setMessage(error.message); // Display error message
            });
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>Register</h3>

                    {message && (
                        <div
                            className={`alert ${message.includes("successfully")
                                ? "alert-success"
                                : "alert-danger"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

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

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered? <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
