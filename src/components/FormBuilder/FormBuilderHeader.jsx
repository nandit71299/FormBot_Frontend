import React, { useState, useEffect } from "react";
import styles from "./FormBuilderHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import { toggleAppTheme } from "../../utils/apiUtil";
import { toast } from "react-toastify";
import { selectWorkspace } from "../../redux/reducers/workspaceReducer"; // Ensure this action is imported
import { useNavigate } from "react-router-dom";

function FormBuilderHeader({
  workspaces,
  selectedWorkspace,
  setSelectedWorkspace,
  isSharedWorkspaceFolders,
  openInviteModal,
}) {
  const darkMode = useSelector((store) => store.theme.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (workspaces?.length > 0 && !selectedWorkspace) {
      dispatch(selectWorkspace(workspaces[0])); // Automatically select the first workspace if none is selected
    }
  }, [workspaces, selectedWorkspace, dispatch]);

  const changeTheme = async () => {
    const response = await toggleAppTheme(darkMode ? "light" : "dark");
    if (response.success) {
      dispatch(toggleTheme());
      localStorage.setItem("theme", response?.user?.theme || "true");
    } else {
      toast.error("Failed to toggle theme");
    }
  };

  const handleWorkspaceChange = (workspace) => {
    dispatch(selectWorkspace(workspace)); // Dispatch to update the selected workspace in Redux
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div
      className={`${styles.mainContainer} ${
        darkMode
          ? `${styles.bgDark} ${styles.textLight}`
          : `${styles.bgLight} ${styles.textDark}`
      }`}
    >
      <div className={`${styles.formName}`}>
        <h2>Form Name</h2>
      </div>
      <div>
        <button>Flow</button>
        <button>Response</button>
      </div>
      <div className={styles.toggleContainer}>
        <div>
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
        <div>
          <button
            disabled={isSharedWorkspaceFolders ? true : false}
            className={`${styles.shareBtn} ${
              isSharedWorkspaceFolders && styles.shareBtnDisabled
            }`}
            onClick={() => {
              isSharedWorkspaceFolders ? "" : openInviteModal();
            }}
          >
            Share
          </button>
          &nbsp;&nbsp;
          <button
            disabled={isSharedWorkspaceFolders ? true : false}
            className={`${styles.shareBtn} ${
              isSharedWorkspaceFolders && styles.shareBtnDisabled
            }`}
            onClick={() => {
              isSharedWorkspaceFolders ? "" : openInviteModal();
            }}
          >
            Save
          </button>
          &nbsp;&nbsp;
          <button>X</button>
        </div>
      </div>
    </div>
  );
}

export default FormBuilderHeader;
