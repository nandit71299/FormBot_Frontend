import React from "react";
import LandingHeader from "../components/LandingPage/LandingHeader";
import styles from "./LandingPage.module.css";
import HeroSection from "../components/LandingPage/HeroSection";
import ImageSection from "../components/LandingPage/ImageSection";
import LandingFooter from "../components/LandingPage/LandingFooter";
function LandingPage() {
  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`${styles.landingHeaderContainer}`}>
        <LandingHeader />
      </div>
      <div className={`${styles.heroSectionContainer}`}>
        <HeroSection />
      </div>
      <div className={`${styles.imageSectionContainer}`}>
        <ImageSection />
      </div>
      <div className={`${styles.footerSectionContainer}`}>
        <LandingFooter />
      </div>
    </div>
  );
}

export default LandingPage;
