import React from "react";
import DashboardHeader from "../components/DashboardPage/DashboardHeader";
import FoldersStrip from "../components/DashboardPage/FoldersStrip";
import FormsAndFolders from "../components/DashboardPage/FormsAndFolders";
import { useSelector } from "react-redux";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const darkMode = useSelector((store) => store.theme.darkMode);
  const workspaces = [
    { id: 1, name: "Workspace 1" },
    { id: 2, name: "Workspace 2" },
    { id: 3, name: "Workspace 3" },
  ];
  const folders = [
    { id: 1, name: "Folder 1" },
    { id: 2, name: "Folder 2" },
    { id: 3, name: "Folder 3" },
    { id: 4, name: "Folder 4" },
    { id: 5, name: "Folder 5" },
    { id: 6, name: "Folder 6" },
    { id: 7, name: "Folder 7" },
    { id: 8, name: "Folder 8" },
    { id: 9, name: "Folder 9" },
    { id: 10, name: "Folder 10" },
    { id: 11, name: "Folder 11" },
    { id: 12, name: "Folder 12" },
    { id: 13, name: "Folder 13" },
    { id: 14, name: "Folder 14" },
    { id: 15, name: "Folder 15" },
  ];
  const formsAndFolders = [
    { id: 1, name: "Folder 1" },
    { id: 2, name: "Form 1" },
    { id: 3, name: "Form 2" },
    { id: 4, name: "Form 3" },
    { id: 5, name: "Form 4" },
    { id: 6, name: "Form 5" },
  ];
  return (
    <div
      className={`${
        darkMode ? styles.mainContainerDark : styles.mainContainerLight
      } ${styles.mainContainer}`}
    >
      {/* Dashboard Header */}
      <div>
        <DashboardHeader workspaces={workspaces} />
      </div>
      {/* Dashboard Content */}
      <div
        className={`${darkMode ? styles.bgDark : styles.bgLight} ${
          styles.dashboardContentContainer
        }`}
      >
        <div>
          <FoldersStrip folders={folders} />
        </div>
        <div>
          <FormsAndFolders formsAndFolders={formsAndFolders} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
