import React from "react";
import styles from "./HeroSection.module.css";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
      <div>
        <img src="./traingleLeft.png" alt="" />
      </div>
      <div className={styles.textContentContainer}>
        <h2 className={styles.heading}>Build advanced chatbots visually</h2>
        <p className={styles.subText}>
          Typebot gives you powerful blocks to create unique chat experiences.
          Embed them anywhere on your web/mobile apps and start collecting
          results like magic.
        </p>
        <button className={styles.btn} onClick={() => navigate("/login")}>
          Create a FormBot for free
        </button>
      </div>
      <div>
        <img src="./curveRight.png" alt="" />
      </div>
    </div>
  );
}

export default HeroSection;
