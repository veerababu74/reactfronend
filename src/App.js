import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar"; // Import Navbar
import Login from "./components/Login.js";
import SignUp from "./components/signup";
import UserDetails from "./components/userDetails";
import Product from "./components/products";
import About from "./components/about";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./components/UpdateUser";
import DataHandler from "./components/Data";
import Dashboard from "./components/Dashboard";
import GitHubRedirectHandler from "./components/GitHubRedirectHandler";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check the localStorage for login status and update state accordingly
    const loggedInStatus = window.localStorage.getItem("loggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Pass the isLoggedIn state and setIsLoggedIn function to Navbar */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </>
          ) : (
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Navigate to="/userDetails" />} />
              <Route path="/userDetails" element={<UserDetails />} />
              <Route path="/products" element={<Product />} />
              <Route path="/updateuser" element={<UpdateProfile />} />
              <Route path="/datahandler" element={<DataHandler />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/github-redirect" element={<GitHubRedirectHandler />} />
            </Route>
          )}
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
