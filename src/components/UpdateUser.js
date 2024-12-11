import React, { useState } from "react";
import "../App.css";

export default function UpdateProfile() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem("token");

        if (!token) {
            alert("No token found. Please log in.");
            window.localStorage.clear();
            window.location.href = "./login";
            return;
        }

        fetch("http://127.0.0.1:5000/update-profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setMessage("");
                } else {
                    setMessage(data.message);
                    setError("");
                }
            })
            .catch((err) => {
                console.error("Error updating profile:", err);
                setError("Failed to update profile. Please try again.");
                setMessage("");
            });
    };

    return (
        <div className="update-profile-wrapper">
            <h3>Update Profile</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
