import { createSlice } from "@reduxjs/toolkit";
const darkMode =
  localStorage.getItem("theme") === "true" ? true : false || true;
const initialState = {
  darkMode: darkMode,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    },
    setTheme: (state, action) => {
      return {
        darkMode: action.payload,
      };
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
