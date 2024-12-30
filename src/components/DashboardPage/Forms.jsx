import React from "react";
import { useSelector } from "react-redux";
import styles from "./Forms.module.css";
import { Tooltip } from "react-tooltip";

function Forms({ forms, isSharedWorkspace, accessLevel, openCreateFormModal }) {
  const darkMode = useSelector((store) => store.theme.darkMode);
  const selectedFolder = useSelector((store) => store.workspace.selectedFolder);
  const folders = useSelector((store) => store.workspace.folders); // Access the folders from the Redux store

  // Determine which forms to display
  let formsToDisplay = forms; // Default to workspace-level forms

  if (selectedFolder) {
    // Find the selected folder from the workspace's folders

    const folder = folders.find((folder) => folder._id === selectedFolder);

    if (folder) {
      // If folder exists, display forms for the selected folder
      formsToDisplay = folder.forms || [];
    }
  }

  // Handle undefined or empty forms
  if (!formsToDisplay || formsToDisplay.length === 0) {
    return (
      <div className={styles.mainContainer}>
        <div
          data-tooltip-id="disabled-to-edit"
          className={`${styles.createFormContainer} ${
            accessLevel === "view" && styles.createFormContainerDisabled
          }`}
          onClick={() => {
            if (accessLevel === "edit") openCreateFormModal(true);
          }}
        >
          <i className={`${styles.addIcon} fa-solid fa-plus`}></i>
          <p>Create a Typebot</p>
          {accessLevel === "view" && (
            <Tooltip
              id="disabled-to-edit"
              place="bottom"
              content="You don't have permission to make edits to this workspace"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div
        data-tooltip-id="disabled-to-edit"
        className={`${styles.createFormContainer} ${
          accessLevel === "view" && styles.createFormContainerDisabled
        }`}
        onClick={() => {
          if (accessLevel === "edit") openCreateFormModal(true);
        }}
      >
        <i className={`${styles.addIcon} fa-solid fa-plus`}></i>
        <p>Create a Typebot</p>
        {accessLevel === "view" && (
          <Tooltip
            id="disabled-to-edit"
            place="bottom"
            content="You don't have permission to make edits to this workspace"
          />
        )}
      </div>

      {formsToDisplay.map((form) => {
        return (
          <div
            key={form._id}
            className={`${
              darkMode ? styles.formContainerDark : styles.formContainerLight
            } ${styles.formContainer}`}
          >
            <div className={styles.formItem}>
              <p>{form.formName}</p>
            </div>
            {!isSharedWorkspace && (
              <div className={styles.delIconContainer}>
                <i className={`fa-solid fa-trash-can ${styles.delIcon}`}></i>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Forms;
