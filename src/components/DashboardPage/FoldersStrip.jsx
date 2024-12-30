import React from "react";
import styles from "./FolderStrip.module.css";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";

function FoldersStrip({
  folders,
  isSharedWorkspace,
  accessLevel,
  openCreateFolderModal,
  selectedWorkspace,
  selectFolder, // Destructure selectFolder prop here
}) {
  const darkMode = useSelector((store) => store.theme.darkMode);
  const selectedFolder = useSelector((store) => store.workspace.selectedFolder);
  console.log(selectedFolder);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.folderContainer}>
        <button
          data-tooltip-id="disabled-to-edit"
          onClick={() => {
            if (accessLevel === "edit") openCreateFolderModal(true); // This should only be triggered by the button click
          }}
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
              className={`${
                darkMode
                  ? styles.folderItemContainerDark
                  : styles.folderItemContainerLight
              } ${
                selectedFolder === folder._id
                  ? darkMode
                    ? styles.selectedDark
                    : styles.selectedLight
                  : ""
              }`}
            >
              <div
                className={`${
                  darkMode ? styles.folderItemDark : styles.folderItemLight
                } `}
                onClick={() => {
                  selectFolder(selectedWorkspace, folder); // This will log the folder to the console
                }}
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
