import React from "react";
import styles from "./FormBuilderHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import { toggleAppTheme } from "../../utils/apiUtil";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function FormBuilderHeader({
  handleSaveForm,
  formName,
  handleValidation,
  isFormModified,
  isFormSaved,
  handleViewToggle, // Receive handleViewToggle function as a prop
  selectedView,
  formId,
}) {
  const darkMode = useSelector((store) => store.theme.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Change theme when toggle is clicked
  const changeTheme = async () => {
    const response = await toggleAppTheme(darkMode ? "light" : "dark");
    if (response.success) {
      dispatch(toggleTheme());
      localStorage.setItem("theme", response?.user?.theme || "true");
    } else {
      toast.error("Failed to toggle theme");
    }
  };

  return (
    <div
      className={`${styles.mainContainer} ${
        darkMode
          ? `${styles.bgDark} ${styles.textLight}`
          : `${styles.bgLight} ${styles.textDark}`
      }`}
    >
      <div
        className={`${darkMode ? styles.formNameDark : styles.formNameLight}`}
      >
        <h2>{formName}</h2>
      </div>

      <div>
        <button
          className={`${darkMode ? styles.btnDark : styles.btnLight}
          ${selectedView === "flow" && styles.btnActive}`}
          onClick={() => handleViewToggle("flow")}
        >
          Flow
        </button>
        <button
          className={`${darkMode ? styles.btnDark : styles.btnLight} ${
            selectedView === "response" && styles.btnActive
          }`}
          onClick={() => handleViewToggle("response")}
        >
          Response
        </button>
      </div>

      {/* Theme toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div className={styles.toggleContainer}>
          <label htmlFor="themeLight"> Light </label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={changeTheme}
              id="themeToggle"
            />
            <span className={styles.slider}></span>
          </label>
          <label htmlFor="themeDark"> Dark </label>
        </div>

        {/* Action Buttons */}
        <div className={styles.btnsContainer}>
          {/* Share Button */}
          <button
            className={`${styles.shareBtn} ${
              !isFormSaved && styles.shareBtnDisabled
            }`}
            onClick={() => {
              if (isFormSaved) {
                navigator.clipboard.writeText(
                  `${window.location.hostname}/form/${formId}`
                );
                toast.success("Form Link Copied Successfully");
              } else {
                return;
              }
            }}
          >
            Share
          </button>

          {/* Save Button */}
          <button
            className={`${styles.saveBtn} ${
              !isFormModified && styles.saveBtnDisabled
            }`}
            onClick={async () => {
              if (isFormModified) {
                const response = await handleValidation();
                if (response === true) {
                  handleSaveForm();
                }
              }
            }} // Trigger the save function passed as prop
          >
            Save
          </button>

          {/* Close Button */}
          <button
            className={styles.closeBtn}
            onClick={() => navigate("/dashboard")}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormBuilderHeader;
