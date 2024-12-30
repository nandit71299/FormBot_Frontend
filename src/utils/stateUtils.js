import {
  getWorkspaceFoldersSuccess,
  getWorkspaceFormsSuccess,
  setFolderForms,
} from "../redux/reducers/workspaceReducer";

export const resaveFolders = (dispatch, data) => {
  dispatch(getWorkspaceFoldersSuccess(data));
};

export const resaveForms = (dispatch, data) => {
  dispatch(getWorkspaceFormsSuccess(data));
};

export const resaveFolderForms = async (dispatch, data) => {
  console.log(data);
  dispatch(setFolderForms(data));
};
