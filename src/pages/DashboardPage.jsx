import React from "react";
import DashboardHeader from "../components/DashboardPage/DashboardHeader";
import FoldersStrip from "../components/DashboardPage/FoldersStrip";
import FormsAndFolders from "../components/DashboardPage/FormsAndFolders";
import { useSelector } from "react-redux";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const darkMode = useSelector((store) => store.theme.darkMode);

  return (
    <div
      className={`${
        darkMode ? styles.mainContainerDark : styles.mainContainerLight
      } ${styles.mainContainer}`}
    >
      {/* Dashboard Header */}
      <div>
        <DashboardHeader />
      </div>
      {/* Dashboard Content */}
      <div>
        <FoldersStrip />
      </div>
      <div>
        <FormsAndFolders />
      </div>
    </div>
  );
}

export default DashboardPage;
