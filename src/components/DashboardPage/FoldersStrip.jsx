import React from "react";
import styles from "./FolderStrip.module.css";
import { useSelector } from "react-redux";

function FoldersStrip({ folders }) {
  const darkMode = useSelector((store) => store.theme.darkMode);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.folderContainer}>
        <button
          className={
            darkMode ? `${styles.createBtnDark}` : `${styles.createBtnLight}`
          }
        >
          <i className={`fa-regular fa-folder`}></i> &nbsp;Create Folder
        </button>
        {folders.map((folder) => {
          return (
            <div
              className={
                darkMode
                  ? styles.folderItemContainerDark
                  : styles.folderItemContainerLight
              }
            >
              <div
                key={folder.id}
                className={`${
                  darkMode ? styles.folderItemDark : styles.folderItemLight
                }`}
              >
                {folder.name}
              </div>
              <div className={styles.delIconContainer}>
                <i>
                  <i className="fa-solid fa-trash-can"></i>
                </i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FoldersStrip;
