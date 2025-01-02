import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/apiUtil";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setTheme } from "../../redux/reducers/themeReducer";
import { userLoginSuccess } from "../../redux/reducers/userReducer";

function LoginForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await login(formData);
      if (response.success) {
        toast.success("Login successful!");
        const theme = response?.user?.theme;
        if (theme) {
          dispatch(setTheme(theme === "dark" ? true : false));
        }
        localStorage.setItem("theme", theme === "dark" ? true : false);
        dispatch(userLoginSuccess(response.user));
        const referer = localStorage.getItem("referer");

        if (referer) {
          localStorage.removeItem("referer"); // Remove the referer from storage
          navigate(referer); // Redirect the user to the original page they tried to access
        } else {
          navigate("/dashboard"); // Default redirect after login (e.g., to dashboard)
        }
      } else {
        console.log(response.message);
        toast.error(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
            className={styles.input}
          />
        </div>
        <label htmlFor="password">Password</label>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="********"
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}{" "}
        {/* Show error if any */}
        <div>
          <button type="submit" className={styles.loginBtn}>
            Log In
          </button>
        </div>
        <p style={{ fontWeight: 300, fontSize: "12px" }}>OR</p>
        <div>
          <div className={styles.googleBtn}>
            <img
              src={
                "https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png"
              }
              alt="Google icon"
              className={styles.googleBtnIcon}
            />
            <span className={styles.googleBtnText}>Sign In with Google</span>
          </div>
        </div>
      </form>
      <div className={styles.registerNowContainer}>
        Don’t have an account?{" "}
        <span
          className={styles.registerNowText}
          onClick={() => navigate("/register")}
        >
          Register now
        </span>
      </div>
    </div>
  );
}

export default LoginForm;
