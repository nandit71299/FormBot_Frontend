import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // New field for confirm password
  });

  const [error, setError] = useState(""); // To store any validation errors
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Form submitted", formData); // For now just logging the form data
  };

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="Enter your username"
          />
        </div>

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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            placeholder="********"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div>
          <button type="submit" className={styles.loginBtn}>
            Register
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
            <span className={styles.googleBtnText}>Sign Up with Google</span>
          </div>
        </div>
      </form>

      <div className={styles.registerNowContainer}>
        Already have an account?{" "}
        <span
          className={styles.registerNowText}
          onClick={() => navigate("/login")}
        >
          Log in now
        </span>
      </div>
    </div>
  );
}

export default RegisterForm;
