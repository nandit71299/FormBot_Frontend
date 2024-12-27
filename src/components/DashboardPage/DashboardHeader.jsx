import React, { useState } from "react";
import styles from "./DashboardHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import { toggleAppTheme } from "../../utils/apiUtil";
import { toast } from "react-toastify";

function DashboardHeader({ workspaces }) {
  const darkMode = useSelector((store) => store.theme.darkMode);
  const dispatch = useDispatch();

  // Define a list of workspaces (can be dynamic from an API)

  // State for selected workspace
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);

  const changeTheme = async () => {
    const response = await toggleAppTheme(darkMode ? "light" : "dark");

    if (response.success) {
      dispatch(toggleTheme());
      localStorage.setItem("theme", response?.user?.theme || "true");
    } else {
      toast.error("Failed to toggle theme");
    }
  };

  // Handle workspace selection
  const handleWorkspaceChange = (e) => {
    const selectedId = e.target.value;
    const selected = workspaces.find(
      (workspace) => workspace.id === parseInt(selectedId)
    );
    setSelectedWorkspace(selected);
    console.log("Selected Workspace:", selected);
  };

  return (
    <div
      className={`${styles.mainContainer} ${
        darkMode
          ? `${styles.bgDark}  ${styles.textLight}`
          : `${styles.bgLight} ${styles.textDark}`
      }`}
    >
      <div></div>
      {/* Dropdown for workspaces */}
      <div className={styles.workspaceDropdown}>
        <select
          id="workspaceSelect"
          value={selectedWorkspace.id}
          onChange={handleWorkspaceChange}
        >
          {workspaces.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Toggle and Share Button */}
      <div className={styles.toggleContainer}>
        <div>
          <label htmlFor="themeLight"> Light &nbsp; </label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={changeTheme}
              id="themeToggle"
            />
            <span className={styles.slider}></span>
          </label>
          <label htmlFor="themeDark">&nbsp; Dark</label>
        </div>

        {/* Share Button */}
        <button className={styles.shareBtn}>Share</button>
      </div>
    </div>
  );
}

export default DashboardHeader;
