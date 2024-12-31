import React from "react";
import styles from "./FolderStrip.module.css";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

function FoldersStrip({
  folders,
  isSharedWorkspace,
  accessLevel,
  openCreateFolderModal,
  selectedWorkspace,
  selectFolder,
  openConfirmtionModal,
  setDeleteData,
}) {
  const darkMode = useSelector((store) => store.theme.darkMode);
  const selectedFolder = useSelector((store) => store.workspace.selectedFolder);

  const handleDelete = (workspace, folderId) => {
    if (!workspace || !folderId) {
      toast.error("Something went wrong");
      return;
    }
    setDeleteData(workspace._id, folderId);
    openConfirmtionModal();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.folderContainer}>
        <button
          data-tooltip-id="disabled-to-edit"
          onClick={() => {
            if (accessLevel === "edit") openCreateFolderModal(true);
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

        {folders.map((folder) => (
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
                selectFolder(selectedWorkspace, folder);
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
              onClick={() => handleDelete(selectedWorkspace, folder._id)}
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
        ))}
      </div>
    </div>
  );
}

export default FoldersStrip;
