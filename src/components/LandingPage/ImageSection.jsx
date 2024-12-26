import React from "react";
import styles from "./ImageSection.module.css";
import appFlow from "../../../public/appFlow.png";

function ImageSection() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftCircularObj}></div>
      <div className={styles.rightCircularObj}></div>
      <div className={styles.mainImageContainer}>
        <img src={appFlow} alt="App Flow Image" />
      </div>
    </div>
  );
}

export default ImageSection;
