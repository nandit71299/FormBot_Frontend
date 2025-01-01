import React from "react";
import styles from "./LoginPage.module.css";
import LoginHeader from "../components/LoginPage/LoginHeader";
import LoginForm from "../components/LoginPage/LoginForm";
import { verifyToken } from "../utils/apiUtil";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    const checkToken = async () => {
      try {
        const response = await verifyToken();
        if (response.success) {
          navigate("/dashboard");
        } else {
          toast.error("Login Expired. Please log in again...");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
        toast.error("Login Expired. Please log in again...");
      }
    };
    checkToken();
  }
  return (
    <div className={styles.mainContainer}>
      <div>
        <LoginHeader />
      </div>
      <div>
        <LoginForm />
      </div>
      <div className={styles.floatingObj1}>
        <img src="./ellipse1.png" alt="" />
      </div>
      <div className={styles.floatingObj2}>
        <img src="./ellipse2.png" alt="" />
      </div>
      <div className={styles.floatingObj4}>
        <img src="./polygon.png" alt="" />
      </div>
      <div className={styles.floatingObj3}>
        <img src="./polygon.png" alt="" />
      </div>
    </div>
  );
}

export default LoginPage;
