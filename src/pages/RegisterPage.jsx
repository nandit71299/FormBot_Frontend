import React from "react";
import styles from "./RegisterPage.module.css";
import RegisterHeader from "../components/RegisterPage/RegisterHeader";
import RegisterForm from "../components/RegisterPage/RegisterForm";

function RegisterPage() {
  return (
    <div className={styles.mainContainer}>
      <div>
        <RegisterHeader />
      </div>
      <div>
        <RegisterForm />
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

export default RegisterPage;
