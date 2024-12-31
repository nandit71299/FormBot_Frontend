import React from "react";
import styles from "./DeleteConfirmationModal.module.css"; // Assuming the modal styling
import { toast } from "react-toastify";

function DeleteConfirmationModal({ onConfirm, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.headerRow}>
          <h2 className={styles.sectionTitle}>
            Are you sure you want to delete this Folder ?
          </h2>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.primaryButton}
            onClick={() => {
              onConfirm();
              toast.success("Folder deleted successfully.");
            }}
          >
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
