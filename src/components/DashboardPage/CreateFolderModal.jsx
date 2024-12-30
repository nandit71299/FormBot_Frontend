import React from "react";
import styles from "./CreateFolderModal.module.css";
import { createFolder, getWorkspaceFolders } from "../../utils/apiUtil";
import { toast } from "react-toastify";
import { resaveFolders } from "../../utils/stateUtils";
import { useDispatch } from "react-redux";
import {
  getWorkspaceFoldersRequest,
  getWorkspaceFoldersSuccess,
} from "../../redux/reducers/workspaceReducer";

function CreateFolderModal({ onClose, selectedWorkspace }) {
  const [folderName, setFolderName] = React.useState("");
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (folderName.trim()) {
      const response = await createFolder({
        workspaceId: selectedWorkspace._id,
        folderName: folderName,
      });

      if (response.success) {
        dispatch(getWorkspaceFoldersRequest());
        console.log(selectedWorkspace);
        const refetchFolders = await getWorkspaceFolders(selectedWorkspace._id);
        if (refetchFolders.success) {
          resaveFolders(dispatch, refetchFolders);
        } else {
          toast.error(
            "Failed to fetch workspace folders. Please refresh the page."
          );
        }
        toast.success("Folder created successfully!");
        onClose();
      } else {
        toast.error(response.message || "Error creating folder");
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>Create New Folder</h2>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
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

export default CreateFolderModal;
