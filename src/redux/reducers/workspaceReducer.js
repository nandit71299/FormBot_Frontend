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
        (folder) => folder._id !== action.payload.folderId // Since payload is just folderId
      );
    },
    // New action to remove a form from the workspace forms array
    deleteWorkspaceFormSuccess: (state, action) => {
      const { formId } = action.payload;
      state.forms = state.forms.filter((form) => form._id !== formId);
    },
    // New action to remove a form from a specific folder's forms array
    deleteFolderFormSuccess: (state, action) => {
      const { folderId, formId } = action.payload;
      state.folders = state.folders.map((folder) => {
        if (folder._id === folderId) {
          // Filter out the form with the matching formId within the folder
          folder.forms = folder.forms.filter((form) => form._id !== formId);
        }
        return folder;
      });
    },
    addFormElement: (state, action) => {
      const { formId, folderId, element } = action.payload;

      if (folderId) {
        // If a folderId is provided, find the folder and add element inside that form
        state.folders = state.folders.map((folder) =>
          folder._id === folderId
            ? {
                ...folder,
                forms: folder.forms.map((form) =>
                  form._id === formId
                    ? { ...form, elements: [...form.elements, element] }
                    : form
                ),
              }
            : folder
        );
      } else {
        // If no folderId, add the element in workspace-level forms
        state.forms = state.forms.map((form) =>
          form._id === formId
            ? { ...form, elements: [...form.elements, element] }
            : form
        );
      }
    },

    // Update a form element (either in a folder or workspace level)
    updateFormElement: (state, action) => {
      const { formId, folderId, elementId, key, value } = action.payload;

      if (folderId) {
        // Update in folder
        state.folders = state.folders.map((folder) =>
          folder._id === folderId
            ? {
                ...folder,
                forms: folder.forms.map((form) =>
                  form._id === formId
                    ? {
                        ...form,
                        elements: form.elements.map((el) =>
                          el.id === elementId ? { ...el, [key]: value } : el
                        ),
                      }
                    : form
                ),
              }
            : folder
        );
      } else {
        // Update in workspace-level forms
        state.forms = state.forms.map((form) =>
          form._id === formId
            ? {
                ...form,
                elements: form.elements.map((el) =>
                  el.id === elementId ? { ...el, [key]: value } : el
                ),
              }
            : form
        );
      }
    },

    // Delete a form element (either in a folder or workspace level)
    deleteFormElement: (state, action) => {
      const { formId, folderId, elementId } = action.payload;

      if (folderId) {
        // Delete from folder forms
        state.folders = state.folders.map((folder) =>
          folder._id === folderId
            ? {
                ...folder,
                forms: folder.forms.map((form) =>
                  form._id === formId
                    ? {
                        ...form,
                        elements: form.elements.filter(
                          (el) => el.id !== elementId
                        ),
                      }
                    : form
                ),
              }
            : folder
        );
      } else {
        // Delete from workspace-level forms
        state.forms = state.forms.map((form) =>
          form._id === formId
            ? {
                ...form,
                elements: form.elements.filter((el) => el.id !== elementId),
              }
            : form
        );
      }
    },
    selectFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },

    // Reset folder selection
    resetFolderSelection: (state) => {
      state.selectedFolder = null;
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
  deleteFolderSuccess,
  deleteWorkspaceFormSuccess, // Export new action
  deleteFolderFormSuccess, // Export new action
  addFormElement,
  updateFormElement,
  deleteFormElement,
  selectFolder,
  resetFolderSelection,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
