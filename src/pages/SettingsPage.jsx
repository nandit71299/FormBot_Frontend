import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateProfile } from "../utils/apiUtil";
import { setUserDetails } from "../redux/reducers/userReducer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import styles from "./SettingsPage.module.css";
import axios from "axios"; // Import axios for making API calls
import { useNavigate } from "react-router-dom";

function SettingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const darkMode = useSelector((state) => state.theme.darkMode);

  // State to manage password visibility and input values
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!user || !user._id) {
      const getUserInfo = async () => {
        try {
          const response = await getUserDetails();
          if (response.success) {
            dispatch(setUserDetails(response.user));
            setUsername(response.user.username);
            setEmail(response.user.email);
          } else {
            toast.error("Error getting user details");
          }
        } catch (error) {
          toast.error("Error getting user details");
        }
      };
      getUserInfo();
    }
  }, [user, dispatch]);

  if (!user) {
    return <Loader />;
  }

  // Toggle password visibility
  const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the request data based on the input fields
    const updatedUserData = {
      username,
      email,
      oldPassword: oldPassword || undefined, // Send oldPassword if it's provided
      password: newPassword || undefined, // Send newPassword if it's provided
    };

    try {
      const response = await updateProfile(updatedUserData);
      if (response.success) {
        // Dispatch the updated user data to Redux
        dispatch(setUserDetails(response.user));
        localStorage.setItem("token", response.token);

        // Optionally, you could update the local state here if you want to reflect the changes immediately
        setUsername(response.user.username);
        setEmail(response.user.email);

        // Show success toast notification
        toast.success("Profile updated successfully!");

        // Clear password fields after update
        setOldPassword("");
        setNewPassword("");
      } else {
        toast.error(response.message || "Error updating profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={`${styles.mainContainer} ${
        darkMode ? styles.mainContainerDark : styles.mainContainerLight
      }`}
    >
      <h1
        className={`${darkMode ? styles.pageTitleDark : styles.pageTitleLight}`}
      >
        Settings
      </h1>
      <form
        className={`${styles.formContainer} ${
          darkMode ? styles.formDark : styles.formLight
        }`}
        onSubmit={handleSubmit}
      >
        {/* Username */}
        <div className={styles.textInputGroup}>
          <i className={`fa-regular fa-user ${styles.textInputIcon}`}></i>
          <input
            type="text"
            className={`${styles.textInput} ${
              darkMode ? styles.textInputDark : styles.textInputLight
            }`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        {/* Email */}
        <div className={styles.textInputGroup}>
          <i className={`fa-solid fa-envelope ${styles.textInputIcon}`}></i>
          <input
            type="email"
            className={`${styles.textInput} ${
              darkMode ? styles.textInputDark : styles.textInputLight
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        {/* Old Password */}
        <div className={styles.textInputGroup}>
          <i className={`fa-solid fa-lock ${styles.textInputIcon}`}></i>
          <input
            type={showOldPassword ? "text" : "password"}
            className={`${styles.textInput} ${
              darkMode ? styles.textInputDark : styles.textInputLight
            }`}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
          />
          <i
            onClick={toggleOldPasswordVisibility}
            className={`fa-solid ${
              showOldPassword ? "fa-eye-slash" : "fa-eye"
            } ${styles.passwordIcon}`}
          ></i>
        </div>

        {/* New Password */}
        <div className={styles.textInputGroup}>
          <i className={`fa-solid fa-lock ${styles.textInputIcon}`}></i>
          <input
            type={showNewPassword ? "text" : "password"}
            className={`${styles.textInput} ${
              darkMode ? styles.textInputDark : styles.textInputLight
            }`}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <i
            onClick={toggleNewPasswordVisibility}
            className={`fa-solid ${
              showNewPassword ? "fa-eye-slash" : "fa-eye"
            } ${styles.passwordIcon}`}
          ></i>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Update
        </button>
      </form>
      <div className={styles.logoutContainer}>
        <button
          className={darkMode ? styles.logoutBtnDark : styles.logoutBtnLight}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          <i className="fa-solid fa-sign-out-alt" style={{ color: "red" }}></i>
          &nbsp;Logout
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
