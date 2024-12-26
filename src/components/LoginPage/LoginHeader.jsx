import React from "react";
import styles from "./LoginHeader.module.css";
import { useNavigate } from "react-router-dom";

function LoginHeader() {
  const navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
      <button onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
    </div>
  );
}

export default LoginHeader;
