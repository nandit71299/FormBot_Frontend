import React, { useState } from "react";
import styles from "./InviteModal.module.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function InviteModal({ onClose, onSendInvite, onCopyLink }) {
  const [email, setEmail] = useState("");
  const [access, setAccess] = useState("Edit");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedWorkspace = useSelector(
    (store) => store.workspace.selectedWorkspace
  );

  const handleSendInvite = () => {
    if (email.trim()) {
      if (access.trim()) {
        onSendInvite(email, access.toLowerCase());
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_FRONTEND_URL}/share/${
        selectedWorkspace._id
      }/${access.toLowerCase()}`
    );
    toast.success("Link copied successfully");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.headerRow}>
          <h2 className={styles.sectionTitle}>Invite by Email</h2>
          <div
            className={styles.dropdownContainer}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className={styles.dropdownSelected}>{access}</span>
            <span className={styles.dropdownArrow}>&#9662;</span>
            {isDropdownOpen && (
              <div className={styles.dropdownList}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => {
                    setAccess("Edit");
                    setIsDropdownOpen(false);
                  }}
                >
                  Edit
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => {
                    setAccess("View");
                    setIsDropdownOpen(false);
                  }}
                >
                  View
                </div>
              </div>
            )}
          </div>
        </div>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={styles.primaryButton} onClick={handleSendInvite}>
          Send Invite
        </button>
        <h2 className={styles.sectionTitle}>Invite by Link</h2>
        <button className={styles.primaryButton} onClick={handleCopyLink}>
          Copy link
        </button>
      </div>
    </div>
  );
}

export default InviteModal;
