import React from "react";
import styles from "./LoginPage.module.css";
import LoginHeader from "../components/LoginPage/LoginHeader";
import LoginForm from "../components/LoginPage/LoginForm";
import ellipse1 from "../../public/ellipse1.png";
import ellipse2 from "../../public/ellipse2.png";
import polygon from "../../public/polygon.png";

function LoginPage() {
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
