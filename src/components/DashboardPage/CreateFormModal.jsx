import React from "react";
import styles from "./CreateFormModal.module.css";
import {
  createFolder,
  createForm,
  createFormInsideFolder,
  getFolderForms,
  getWorkspaceFolders,
  getWorkspaceForms,
} from "../../utils/apiUtil";
import { toast } from "react-toastify";
import { resaveForms } from "../../utils/stateUtils";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspaceFormsRequest } from "../../redux/reducers/workspaceReducer";

function CreateFormModal({ onClose, selectedWorkspace }) {
  const [formName, setFormName] = React.useState("");
  const dispatch = useDispatch();
  const selectedFolder = useSelector((state) => state.workspace.selectedFolder);

  const handleSave = async () => {
    if (!selectedFolder) {
      if (formName.trim()) {
        const response = await createForm({
          workspaceId: selectedWorkspace._id,
          formName: formName,
        });

        if (response.success) {
          dispatch(getWorkspaceFormsRequest());
          const refetchForms = await getWorkspaceForms(selectedWorkspace._id);
          if (refetchForms.success) {
            console.log(refetchForms);
            resaveForms(dispatch, refetchForms.forms);
          } else {
            toast.error(
              "Failed to fetch workspace forms. Please refresh the page."
            );
          }
          toast.success("Form created successfully!");
          onClose();
        } else {
          toast.error(response.message || "Error creating folder");
        }
      }
    } else {
      if (formName.trim()) {
        const response = await createFormInsideFolder(
          selectedWorkspace._id,
          selectedFolder,
          formName
        );
        console.log("response", response);
        if (response.success) {
          dispatch(getWorkspaceFormsRequest());
          const refetchFolderForms = await getFolderForms(
            selectedWorkspace._id,
            response?.data?.folderId
          );
          if (refetchFolderForms.success) {
            console.log(refetchFolderForms);
            resaveForms(dispatch, refetchFolderForms.forms);
          } else {
            toast.error(
              "Failed to fetch folder forms. Please refresh the page."
            );
          }
          toast.success("Form created successfully!");
          onClose();
        }
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>Create New Form</h2>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter form name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <div className={styles.buttonGroup}>
          <button className={styles.saveButton} onClick={handleSave}>
            Done
          </button>
          <div
            style={{ height: "50px", width: "1px", backgroundColor: "gray" }}
          ></div>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFormModal;
