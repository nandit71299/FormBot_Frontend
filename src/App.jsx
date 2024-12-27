// App.js
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import DashboardPage from "./pages/DashboardPage";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./redux/reducers/themeReducer";

function App() {
  const theme = localStorage.getItem("theme");
  const dispatch = useDispatch();
  if (theme) {
    if (theme === "dark") {
      dispatch(setTheme(true));
    } else if (theme === "light") {
      dispatch(setTheme(false));
    } else {
      dispatch(setTheme(true));
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
