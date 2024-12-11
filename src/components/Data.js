import React, { useState } from "react";
import "../App.css";

export default function DataHandler() {
    const [inputData, setInputData] = useState(""); // Input field value
    const [responseMessage, setResponseMessage] = useState(null); // API response
    const [error, setError] = useState(null); // Error handling

    const handleSubmit = () => {
        const token = window.localStorage.getItem("token");

        if (!token) {
            alert("No token found. Please log in.");
            window.localStorage.clear();
            window.location.href = "./login";
            return;
        }

        // Call the /data endpoint
        fetch("http://127.0.0.1:5000/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ input_data: inputData }), // Send inputData in the body
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((data) => {
                        const errorMsg = data.error || `HTTP ${res.status}`;
                        throw new Error(errorMsg);
                    });
                }
                return res.json();
            })
            .then((data) => {
                console.log("API Response:", data);
                setResponseMessage(data.message); // Store the success message
                setError(null); // Clear previous errors
            })
            .catch((err) => {
                console.error("Error calling /data:", err.message, err);
                setError(`Error: ${err.message}. More details in console.`);
                setResponseMessage(null); // Clear previous response

                if (err.message.includes("expired") || err.message.includes("invalid")) {
                    alert("Token expired or invalid. Please log in again.");
                    window.localStorage.clear();
                    window.location.href = "./login";
                }
            });
    };

    return (
        <div className="data-handler">
            <h3>Data Handler</h3>
            <div className="form-group">
                <label htmlFor="inputData">Enter Data:</label>
                <input
                    type="text"
                    id="inputData"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    className="form-control"
                    placeholder="Enter some data to send to the API"
                />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">
                Submit
            </button>

            {responseMessage && (
                <div className="alert alert-success mt-3">{responseMessage}</div>
            )}

            {error && (
                <div className="alert alert-danger mt-3">
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
    );
}
