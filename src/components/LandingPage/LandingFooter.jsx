import React from "react";
import styles from "./LandingFooter.module.css";
import logo from "../../../public/download.png";

function LandingFooter() {
  return (
    <div className={styles.mainContainer}>
      <div>
        <div className={styles.logoContainer}>
          <div className={styles.logoSubContainer}>
            <img src="./download.png" alt="" />
            <h2>FormBot</h2>
          </div>
          <p>Made with ❤️ by @cuvette</p>
        </div>
      </div>
      <div className={styles.column}>
        <h2 className={styles.columnHeading}>Products</h2>
        <div className={styles.columnItem}>
          <p className={styles.item}>Status</p>
          <i className="colorWhite fa-solid fa-arrow-up-right-from-square"></i>
        </div>
        <div className={styles.columnItem}>
          <p className={styles.item}>Documentation</p>
          <i className="colorWhite fa-solid fa-arrow-up-right-from-square"></i>
        </div>
        <div className={styles.columnItem}>
          <p className={styles.item}>Roadmap</p>
          <i className="colorWhite fa-solid fa-arrow-up-right-from-square"></i>
        </div>
        <div className={styles.columnItem}>
          <p className={styles.item}>Pricing</p>
        </div>
      </div>
      <div className={styles.column}>
        <h2 className={styles.columnHeading}>Community</h2>
        <div className={styles.columnItem}>
          <p className={styles.item}>Discord</p>
          <i className="colorWhite fa-solid fa-arrow-up-right-from-square"></i>
        </div>
        <div className={styles.columnItem}>
          <p className={styles.item}>GitHub repository</p>
          <i className="colorWhite fa-solid fa-arrow-up-right-from-square"></i>
        </div>
        <div className={styles.columnItem}>
          <p className={styles.item}>Twitter</p>
          <i className="colorWhite fa-solid fa-arrow-up-right-from-square"></i>
        </div>
        <div className={styles.columnItem}>
          <p className={styles.item}>LinkedIn</p>
          <i className="colorWhite fa-solid fa-arrow-up-right-from-square"></i>
        </div>
        <div className={styles.columnItem}>
          <p className={styles.item}>OSS Friends</p>
        </div>
      </div>
      <div className={styles.column}>
        <h2 className={styles.columnHeading}>Company</h2>
        <div className={styles.columnItem}>
          <p className={styles.item}>About</p>
        </div>
        <div className={styles.columnItem}>
          <p className={styles.item}>Contact</p>
        </div>
        <div className={styles.columnItem}>
          <p className={styles.item}>Terms Of Service</p>
        </div>
        <div className={styles.columnItem}>
          <p className={styles.item}>Privacy Policy</p>
        </div>
      </div>

      <div></div>
      <div></div>
    </div>
  );
}

export default LandingFooter;
