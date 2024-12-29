import React, { useState, useEffect } from "react";
import styles from "./DashboardHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import { toggleAppTheme } from "../../utils/apiUtil";
import { toast } from "react-toastify";
import { selectWorkspace } from "../../redux/reducers/workspaceReducer"; // Ensure this action is imported

function DashboardHeader({
  workspaces,
  selectedWorkspace,
  setSelectedWorkspace,
}) {
  const darkMode = useSelector((store) => store.theme.darkMode);
  const dispatch = useDispatch();
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
      <div></div>
      <div className={styles.workspaceDropdown}>
        <div
          className={`${styles.selectedWorkspace} ${
            darkMode
              ? styles.selectedWorkspaceDark
              : styles.selectedWorkspaceLight
          }`}
          onClick={toggleDropdown}
        >
          {selectedWorkspace?.workspaceName || "Select Workspace"}
          <i
            className={`fa ${
              dropdownOpen ? "fa-chevron-up" : "fa-chevron-down"
            } ${styles.dropdownIcon}`}
          />
        </div>
        {dropdownOpen && (
          <div
            className={`${styles.dropdownMenu} ${
              darkMode ? styles.dropdownMenuDark : styles.dropdownMenuLight
            }`}
          >
            {workspaces?.length > 0 ? (
              workspaces.map((workspace) => (
                <div
                  key={workspace._id}
                  className={`${styles.dropdownItem}
                    ${
                      darkMode
                        ? styles.dropdownItemDark
                        : styles.dropdownItemLight
                    }`}
                  onClick={() => handleWorkspaceChange(workspace)}
                >
                  {workspace.workspaceName}
                </div>
              ))
            ) : (
              <div className={styles.dropdownItem}>No Workspaces Available</div>
            )}
            <div className={styles.divider}></div>
            <div
              className={styles.dropdownItem}
              onClick={() => console.log("Settings clicked")}
            >
              Settings
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() => console.log("Log Out clicked")}
            >
              Log Out
            </div>
          </div>
        )}
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
        <button className={styles.shareBtn}>Share</button>
      </div>
    </div>
  );
}

export default DashboardHeader;
