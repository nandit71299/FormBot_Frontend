import React from "react";
import { toast } from "react-toastify";
import { deleteForm } from "../../utils/apiUtil";
import styles from "./DeleteFormConfirmationModal.module.css";

const DeleteFormConfirmationModal = ({ onConfirm, onClose, formData }) => {
  const handleDelete = async () => {
    try {
      const { workspaceId, formId, folderId } = formData;

      // Call deleteForm API function, passing folderId (which might be null or undefined)
      const response = await deleteForm(workspaceId, folderId, formId);

      if (response.success) {
        toast.success("Form deleted successfully");
        onConfirm(formId); // Notify parent to update state
        onClose(); // Close the modal after deletion
      } else {
        toast.error(response.message || "Failed to delete form");
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error(error.message || "Error deleting form");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Are you sure you want to delete this form?</h2>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFormConfirmationModal;
