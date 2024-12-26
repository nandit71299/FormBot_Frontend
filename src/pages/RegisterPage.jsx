import React from "react";
import styles from "./RegisterPage.module.css";
import RegisterHeader from "../components/RegisterPage/RegisterHeader";
import RegisterForm from "../components/RegisterPage/RegisterForm";
import ellipse1 from "../../public/ellipse1.png";
import ellipse2 from "../../public/ellipse2.png";
import polygon from "../../public/polygon.png";

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
        <img src={ellipse1} alt="" />
      </div>
      <div className={styles.floatingObj2}>
        <img src={ellipse2} alt="" />
      </div>
      <div className={styles.floatingObj4}>
        <img src={polygon} alt="" />
      </div>
      <div className={styles.floatingObj3}>
        <img src={polygon} alt="" />
      </div>
    </div>
  );
}

export default RegisterPage;
