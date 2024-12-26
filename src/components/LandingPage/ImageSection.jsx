import React from "react";
import styles from "./ImageSection.module.css";

function ImageSection() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftCircularObj}></div>
      <div className={styles.rightCircularObj}></div>
      <div className={styles.mainImageContainer}>
        <img src="./appFlow.png" alt="App Flow Image" />
      </div>
    </div>
  );
}

export default ImageSection;
