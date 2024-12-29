import React from "react";
import styles from "./FolderStrip.module.css";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";

function FoldersStrip({ folders, isSharedWorkspace, accessLevel }) {
  const darkMode = useSelector((store) => store.theme.darkMode);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.folderContainer}>
        <button
          data-tooltip-id="disabled-to-edit"
          className={`${
            darkMode ? styles.createBtnDark : styles.createBtnLight
          } ${accessLevel === "view" && styles.createBtnDisabled}`}
        >
          <i className="fa-regular fa-folder"></i> &nbsp;Create Folder
          {accessLevel === "view" && (
            <Tooltip
              id="disabled-to-edit"
              place="bottom"
              content="You don't have permission to make edits to this workspace"
            />
          )}
        </button>
        {folders.map((folder) => {
          return (
            <div
              key={folder._id}
              className={
                darkMode
                  ? styles.folderItemContainerDark
                  : styles.folderItemContainerLight
              }
            >
              <div
                className={`${
                  darkMode ? styles.folderItemDark : styles.folderItemLight
                }`}
              >
                {folder.folderName}
              </div>
              <button
                data-tooltip-id="disabled-to-edit"
                className={`${styles.delIconContainer} ${
                  accessLevel === "view" && styles.disbaledBtn
                }`}
                disabled={accessLevel === "view" ? true : false}
              >
                <i>
                  <i className="fa-solid fa-trash-can"></i>
                </i>
                {accessLevel === "view" && (
                  <Tooltip
                    id="disabled-to-edit"
                    place="bottom"
                    content="You don't have permission to make edits to this workspace"
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FoldersStrip;
