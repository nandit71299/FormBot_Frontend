import React from "react";
import { useSelector } from "react-redux";
import styles from "./FormsAndFolders.module.css";

function FormsAndFolders({ formsAndFolders }) {
  const darkMode = useSelector((store) => store.theme.darkMode);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.formsAndFoldersContainer}>
        <div className={styles.createFolderContainer}>
          <i className={`${styles.addIcon} fa-solid fa-plus`}></i>
          <p>Create a typebot</p>
        </div>
        {formsAndFolders.map((formOrFolder) => {
          return (
            <div
              key={formOrFolder.id}
              className={` ${
                darkMode
                  ? styles.formOrFolderContainerDark
                  : styles.formOrFolderContainerLight
              } ${styles.formOrFolderContainer}`}
            >
              <div className={`${styles.formOrFolderItem}`}>
                <p>{formOrFolder.name}</p>
              </div>
              <div className={styles.delIconContainer}>
                <i className={`fa-solid fa-trash-can ${styles.delIcon}`}></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FormsAndFolders;
