import React from "react";
import styles from "./LandingHeader.module.css";
import { useNavigate } from "react-router-dom";

function LandingHeader() {
  const navigate = useNavigate();
  return (
    <div className={`${styles.mainContainer}`}>
      <div className={styles.logoContainer}>
        <img src="./download.png" alt="FormBot Logo" />
        <h2 className={`${styles.companyName}`}>FormBot</h2>
      </div>
      <div className={`${styles.loginSignupContainer}`}>
        <button
          className={`${styles.signInBtn}`}
          onClick={() => navigate("/login")}
        >
          Sign in
        </button>
        <button
          className={`${styles.singUpBtn}`}
          onClick={() => navigate("/login")}
        >
          Create a FormBot
        </button>
      </div>
    </div>
  );
}

export default LandingHeader;
