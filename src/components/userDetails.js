// import React, { useEffect, useState } from "react";
// import "../App.css";
// import UserHome from "./userHome";

// export default function UserDetails() {
//   const [userData, setUserData] = useState(null); // To store user details
//   const [error, setError] = useState(null); // To store errors

//   useEffect(() => {
//     const token = window.localStorage.getItem("token");

//     if (!token) {
//       alert("No token found. Please log in.");
//       window.localStorage.clear();
//       window.location.href = "./login";
//       return;
//     }

//     // Fetch user profile data
//     fetch("http://127.0.0.1:5000/profile", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           return res.json().then((data) => {
//             const errorMsg = data.error || `HTTP ${res.status}`;
//             throw new Error(errorMsg);
//           });
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("User profile fetched successfully:", data);
//         setUserData(data); // Store user data
//       })
//       .catch((err) => {
//         console.error("Error fetching profile:", err.message, err);
//         setError(`Error: ${err.message}. More details in console.`);

//         if (err.message.includes("expired") || err.message.includes("invalid")) {
//           alert("Token expired or invalid. Please log in again.");
//           window.localStorage.clear();
//           window.location.href = "./login";
//         }
//       });
//   }, []); // Run this effect only once after component mounts

//   // If an error occurred
//   if (error) {
//     return (
//       <div className="error-wrapper">
//         <h3>Error Fetching Profile</h3>
//         <p>{error}</p>
//         <button
//           onClick={() => {
//             window.localStorage.clear();
//             window.location.href = "./login";
//           }}
//           className="btn btn-primary"
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   // Show loading while fetching data
//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   // Render UserHome component once data is available
//   return <UserHome userData={userData} />;
// }




import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import UserHome from "./userHome";

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please log in.");
      window.localStorage.clear();
      window.location.href = "./login";
      return;
    }

    fetch("https://render-flask-2yo0.onrender.com/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
        setUserData(data);
      })
      .catch((err) => {
        setError(err.message);

        if (err.message.includes("expired") || err.message.includes("invalid")) {
          alert("Token expired or invalid. Please log in again.");
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }, []);

  if (error) {
    return (
      <div className="error-wrapper">
        <h3>Error Fetching Profile</h3>
        <p>{error}</p>
        <button
          onClick={() => {
            window.localStorage.clear();
            window.location.href = "./login";
          }}
          className="btn btn-primary"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserHome userData={userData} />
      <button
        className="btn btn-secondary"
        onClick={() => navigate("/datahandler")} // Navigate to DataHandler
      >
        Go to Data Handler
      </button>
    </div>
  );
}
