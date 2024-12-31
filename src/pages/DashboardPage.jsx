import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "../components/DashboardPage/DashboardHeader";
import FoldersStrip from "../components/DashboardPage/FoldersStrip";
import Forms from "../components/DashboardPage/Forms";
import {
  getFolderForms,
  getUserDetails,
  getWorkspaceFolders,
  getWorkspaceForms,
  inviteByEmail,
  deleteFolder, // Assuming this function exists in your utils/apiUtil
} from "../utils/apiUtil";
import {
  setLoaded,
  setLoading,
  setUserDetails,
} from "../redux/reducers/userReducer";
import Loader from "../components/Loader";
import styles from "./DashboardPage.module.css";
import { toast } from "react-toastify";
import {
  deleteFolderSuccess,
  getWorkspaceFoldersRequest,
  getWorkspaceFoldersSuccess,
  getWorkspaceFormsRequest,
  getWorkspaceFormsSuccess,
  selectWorkspace,
  setAccessLevel,
  setFolderForms,
  setSelectedFolder,
} from "../redux/reducers/workspaceReducer";
import CreateFolderModal from "../components/DashboardPage/CreateFolderModal";
import CreateFormModal from "../components/DashboardPage/CreateFormModal";
import InviteModal from "../components/DashboardPage/InviteModal";
import DeleteConfirmationModal from "../components/DashboardPage/DeleteConfirmationModal";

function DashboardPage() {
  const dispatch = useDispatch();
  const darkMode = useSelector((store) => store.theme.darkMode);
  const loading = useSelector((store) => store.user.loading);
  const foldersLoading = useSelector((store) => store.workspace.loading);
  const folders = useSelector((store) => store.workspace.folders);
  const forms = useSelector((store) => store.workspace.forms);
  const workspaces = useSelector((store) => store.user.userInfo.workspaces);
  const [showCreateFolderModel, setShowCreateFolderModel] = useState(false);
  const [showCreateFormModal, setShowCreateFormModel] = useState(false);
  const selectedWorkspace = useSelector(
    (store) => store.workspace.selectedWorkspace
  );
  const isSharedWorkspace = useSelector(
    (store) => store.workspace.isSharedWorkspace
  );
  const accessLevel = useSelector((store) => store.workspace.accessLevel);
  const stateFolder = useSelector((store) => store.workspace.folders);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const sendInvite = async (email, access) => {
    try {
      const response = await inviteByEmail(email, access);
      if (response.success) {
        toast.success("Workspace shared successfully");
        setInviteModalOpen(false);
      } else {
        toast.error(response?.message || "Failed to share workspace");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message || "Failed to invite user.");
    }
  };

  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);

  const [selectedToDelete, setSelectedToDelete] = useState({
    workspaceId: "",
    folderId: "",
  });

  const openConfirmtionModal = () => {
    setDeleteConfirmationModalOpen(true);
  };

  const setDeleteData = (workspaceId, folderId) => {
    setSelectedToDelete({
      workspaceId,
      folderId,
    });
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await deleteFolder(
        selectedToDelete.workspaceId,
        selectedToDelete.folderId
      );
      if (response.success) {
        // Dispatch action to remove folder from state
        dispatch(deleteFolderSuccess({ folderId: selectedToDelete.folderId }));
        toast.success("Folder deleted successfully");
        setDeleteConfirmationModalOpen(false);
      } else {
        toast.error(response.message || "Failed to delete folder");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting folder");
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      dispatch(setLoading());
      try {
        const response = await getUserDetails();
        if (response.success) {
          dispatch(setUserDetails(response.user));
        } else {
          toast.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details.");
      } finally {
        dispatch(setLoaded());
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  useEffect(() => {
    if (selectedWorkspace) {
      dispatch(getWorkspaceFoldersRequest());
      const fetchWorkspaceFolders = async () => {
        const response = await getWorkspaceFolders(selectedWorkspace._id);
        if (response.success) {
          dispatch(getWorkspaceFoldersSuccess(response));
          dispatch(setAccessLevel(response?.accessLevel));
        } else {
          toast.error("Failed to fetch workspace folders");
        }
      };
      fetchWorkspaceFolders();

      const fetchWorkspaceForms = async () => {
        dispatch(getWorkspaceFormsRequest());
        const response = await getWorkspaceForms(selectedWorkspace._id);
        if (response.success) {
          dispatch(getWorkspaceFormsSuccess(response.forms));
          dispatch(setAccessLevel(response?.accessLevel));
        } else {
          toast.error("Failed to fetch workspace forms");
        }
      };
      fetchWorkspaceForms();
    }
  }, [selectedWorkspace, dispatch]);

  const selectFolder = async (workspace, folder) => {
    try {
      const response = await getFolderForms(workspace._id, folder._id);
      if (response.success) {
        dispatch(setSelectedFolder(folder._id));
        dispatch(
          setFolderForms({ folderId: folder._id, forms: response.forms })
        );
      }
    } catch (error) {
      toast.error(error.message || "Error creating form");
    }
  };

  if (loading || foldersLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.containerWrapper}>
      <div
        className={`${
          darkMode ? styles.mainContainerDark : styles.mainContainerLight
        } ${styles.mainContainer}`}
      >
        <DashboardHeader
          workspaces={workspaces}
          selectedWorkspace={selectedWorkspace}
          setSelectedWorkspace={(workspace) =>
            dispatch(selectWorkspace(workspace))
          }
          isSharedWorkspaceFolders={isSharedWorkspace}
          openInviteModal={() => setInviteModalOpen(true)}
        />
        <div
          className={`${darkMode ? styles.bgDark : styles.bgLight} ${
            styles.dashboardContentContainer
          }`}
        >
          <div>
            {foldersLoading ? (
              <Loader />
            ) : (
              <FoldersStrip
                folders={folders}
                isSharedWorkspace={isSharedWorkspace}
                accessLevel={accessLevel}
                openCreateFolderModal={() => setShowCreateFolderModel(true)}
                selectedWorkspace={selectedWorkspace}
                selectFolder={selectFolder}
                openConfirmtionModal={openConfirmtionModal}
                setDeleteData={setDeleteData}
              />
            )}
          </div>
          <div>
            <Forms
              forms={forms}
              isSharedWorkspace={isSharedWorkspace}
              accessLevel={accessLevel}
              openCreateFormModal={() => setShowCreateFormModel(true)}
            />
          </div>
        </div>
      </div>
      {showCreateFolderModel && (
        <div className={styles.createFolderModal}>
          <CreateFolderModal
            onClose={() => setShowCreateFolderModel(false)}
            selectedWorkspace={selectedWorkspace}
          />
        </div>
      )}
      {showCreateFormModal && (
        <div className={styles.createFormModal}>
          <CreateFormModal
            onClose={() => setShowCreateFormModel(false)}
            selectedWorkspace={selectedWorkspace}
          />
        </div>
      )}
      {inviteModalOpen && (
        <div className={styles.inviteModal}>
          <InviteModal
            onClose={() => setInviteModalOpen(false)}
            onSendInvite={sendInvite}
          />
        </div>
      )}
      {deleteConfirmationModalOpen && (
        <div className={styles.deleteConfirmationModel}>
          <DeleteConfirmationModal
            onConfirm={handleDeleteConfirmation}
            openConfirmtionModal={openConfirmtionModal}
            onClose={() => setDeleteConfirmationModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
