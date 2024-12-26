import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}:${
  import.meta.env.VITE_API_PORT
}/api`;

export const verifyToken = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await axios.get(`${API_URL}/auth/authenticate`, {
        headers: { Authorization: token },
      });
      return response.data;
    } else {
      return {
        success: false,
        message: "Please Login.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to authenticate user",
    };
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to login.");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const toggleAppTheme = async (mode) => {
  try {
    const response = await axios.put(`${API_URL}/theme/${mode}`, null, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to toggle theme.");
  }
};
