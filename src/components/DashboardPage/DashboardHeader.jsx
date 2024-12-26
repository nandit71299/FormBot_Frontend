import React, { useState } from "react";
import styles from "./DashboardHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import { toggleAppTheme } from "../../utils/apiUtil";
import { toast } from "react-toastify";

function DashboardHeader() {
  const darkMode = useSelector((store) => store.theme.darkMode);

  const dispatch = useDispatch();
  const changeTheme = async () => {
    const response = await toggleAppTheme(darkMode ? "light" : "dark");
    if (response.success) {
      dispatch(toggleTheme());
    } else {
      toast.error("Failed to toggle theme:");
    }
  };
  return (
    <div
      className={`${styles.mainContainer} ${
        darkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <div></div>
      <div>
        <h2>
          {darkMode
            ? "Devang Rastogi's Workspace (Dark Mode)"
            : "Devang Rastogi's Workspace (Light Mode)"}
        </h2>
      </div>
      <div className={styles.toggleContainer}>
        <label htmlFor="themeLight">Light</label>
        {/* Toggle Switch */}
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={changeTheme}
            id="themeToggle"
          />
          <span className={styles.slider}></span>
        </label>
        <label htmlFor="themeDark">Dark</label>
      </div>
    </div>
  );
}

export default DashboardHeader;
