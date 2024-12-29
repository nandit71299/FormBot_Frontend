import React from "react";
import { useSelector } from "react-redux";
import styles from "./Forms.module.css";
import { Tooltip } from "react-tooltip";

function Forms({ forms, isSharedWorkspace, accessLevel }) {
  const darkMode = useSelector((store) => store.theme.darkMode);

  return (
    <div className={styles.mainContainer}>
      <div
        data-tooltip-id="disabled-to-edit"
        className={`${styles.createFormContainer} ${accessLevel === "view" && styles.createFormContainerDisabled}`}
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
      {forms?.length > 0 &&
        forms.map((form) => {
          return (
            <div
              key={form._id}
              className={`${
                darkMode ? styles.formContainerDark : styles.formContainerLight
              } ${styles.formContainer}`}
            >
              <div className={styles.formItem}>
                <p>{form.formName}</p> {/* Adjusted to formName */}
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
