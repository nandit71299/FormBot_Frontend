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
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth(); // Trigger token verification when the component mounts
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    ); // Show loading until verification completes
  }

  return isVerified ? children : <Navigate to="/login" replace />; // Render children if verified, else redirect
};

export default PrivateRoute;
