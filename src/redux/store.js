import { configureStore } from "@reduxjs/toolkit";
// import workspaceReducer from "./reducers/workspaceReducer";
import userReducer from "./reducers/userReducer.js";
import themeReducer from "./reducers/themeReducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    // workspace: workspaceReducer,
  },
});

export default store;
