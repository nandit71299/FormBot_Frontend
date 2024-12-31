import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedWorkspace: null,
  selectedFolder: null,
  folders: [],
  forms: [],
  isSharedWorkspace: false,
  accessLevel: "edit",
  loading: false,
  error: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    selectWorkspace: (state, action) => {
      state.selectedWorkspace = action.payload;
    },
    getWorkspaceFoldersRequest: (state) => {
      state.loading = true;
    },
    getWorkspaceFoldersSuccess: (state, action) => {
      state.loading = false;
      state.folders = action.payload.folders;
      state.isSharedWorkspace = action.payload.isSharedWorkspace; // Store the flag
    },
    getWorkspaceFoldersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getWorkspaceFormsRequest: (state) => {
      state.loading = true;
    },
    getWorkspaceFormsSuccess: (state, action) => {
      state.loading = false;
      state.forms = action.payload; // Store forms directly in workspace
    },
    getWorkspaceFormsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSharedWorkspace: (state, action) => {
      state.isSharedWorkspace = action.payload;
    },
    setAccessLevel: (state, action) => {
      state.accessLevel = action.payload;
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    setFolderForms: (state, action) => {
      const { folderId, forms } = action.payload;
      state.folders = state.folders.map((folder) => {
        if (folder._id === folderId) {
          return { ...folder, forms };
        }
        return folder;
      });
    },
    setLoaded: (state) => {
      state.loading = false;
    },
    // New action to remove a folder from the state after it's deleted
    deleteFolderSuccess: (state, action) => {
      state.folders = state.folders.filter(
        (folder) => folder._id !== action.payload.folderId
      );
    },
  },
});

export const {
  selectWorkspace,
  getWorkspaceFoldersRequest,
  getWorkspaceFoldersSuccess,
  getWorkspaceFoldersFail,
  getWorkspaceFormsRequest,
  getWorkspaceFormsSuccess,
  getWorkspaceFormsFail,
  setSharedWorkspace,
  setAccessLevel,
  setSelectedFolder,
  setFolderForms,
  setLoaded,
  deleteFolderSuccess, // New action export
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
