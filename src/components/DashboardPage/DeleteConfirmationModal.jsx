import React from "react";
import styles from "./DeleteConfirmationModal.module.css";
import { toast } from "react-toastify";

function DeleteConfirmationModal({ onConfirm, onClose, folderData }) {
  console.log(folderData); // Should log the folder data passed from DashboardPage

  const handleDelete = () => {
    if (folderData) {
      onConfirm(folderData.folderId); // Pass folderId to the confirm function
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.headerRow}>
          <h2 className={styles.sectionTitle}>
            Are you sure you want to delete this Folder?
          </h2>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.primaryButton} onClick={handleDelete}>
            Confirm
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
