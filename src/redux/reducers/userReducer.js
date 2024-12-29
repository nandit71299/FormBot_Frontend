import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.userInfo = null;
    },
    setLoading: (state) => {
      state.loading = true; // Simply set loading to true, no payload needed
    },
    setLoaded: (state) => {
      state.loading = false;
      state.error = null;
    },
    setUserDetails: (state, action) => {
      state.userInfo = action.payload; // Store user details in `userInfo`
    },
    setWorkspaces: (state, action) => {
      state.userInfo.workspaces = action.payload; // Store workspaces directly
    },
  },
});

export const {
  setUserDetails,
  setLoaded,
  setLoading,
  setWorkspaces,
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
} = userSlice.actions;

export default userSlice.reducer;
