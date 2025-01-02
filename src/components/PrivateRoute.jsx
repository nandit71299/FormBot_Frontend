// components/PrivateRoute.js
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../utils/apiUtil"; // Assuming you have a token verification utility
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyToken(); // Verify token with the backend
        if (response.success) {
          setIsVerified(true);
        } else {
          setIsVerified(false); // If verification fails, log out or redirect to login
        }
      } catch (error) {
        setIsVerified(false); // If token verification throws an error
      } finally {
        setLoading(false);
      }
    };

    checkAuth(); // Trigger token verification when the component mounts
  }, []);

  // If still loading, show a loading spinner
  if (loading) {
    return <Loader />;
  }

  // If the user is not verified, store the referer and redirect to login
  if (!isVerified) {
    localStorage.setItem("referer", window.location.pathname); // Store the current URL in localStorage
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected content if verified
};

export default PrivateRoute;
