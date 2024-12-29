import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "../components/DashboardPage/DashboardHeader";
import FoldersStrip from "../components/DashboardPage/FoldersStrip";
import Forms from "../components/DashboardPage/Forms";
import {
  getUserDetails,
  getWorkspaceFolders,
  getWorkspaceForms,
} from "../utils/apiUtil"; // Add getWorkspaceForms
import {
  setLoaded,
  setLoading,
  setUserDetails,
} from "../redux/reducers/userReducer";
import Loader from "../components/Loader";
import styles from "./DashboardPage.module.css";
import { toast } from "react-toastify";
import {
  getWorkspaceFoldersRequest,
  getWorkspaceFoldersSuccess,
  getWorkspaceFormsRequest,
  getWorkspaceFormsSuccess,
  selectWorkspace,
  setAccessLevel,
} from "../redux/reducers/workspaceReducer";

function DashboardPage() {
  const dispatch = useDispatch();
  const darkMode = useSelector((store) => store.theme.darkMode);
  const loading = useSelector((store) => store.user.loading);
  const foldersLoading = useSelector((store) => store.workspace.loading);
  const folders = useSelector((store) => store.workspace.folders);
  const forms = useSelector((store) => store.workspace.forms); // Get workspace forms
  const workspaces = useSelector((store) => store.user.userInfo.workspaces);
  const [showCreateFolderModel, setShowCreateFolderModel] = useState(false);
  const selectedWorkspace = useSelector(
    (store) => store.workspace.selectedWorkspace
  );
  const isSharedWorkspaceFolders = useSelector(
    (store) => store.workspace.isSharedWorkspaceFolders
  );
  const isSharedWorkspaceForms = useSelector(
    (store) => store.workspace.isSharedWorkspaceForms
  );
  const accessLevel = useSelector((store) => store.workspace.accessLevel);

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
          dispatch(getWorkspaceFoldersSuccess(response)); // Store folders and isSharedWorkspace flag
          dispatch(setAccessLevel(response?.accessLevel));
        } else {
          toast.error("Failed to fetch workspace folders");
        }
      };
      fetchWorkspaceFolders();

      // Fetch forms from the workspace directly (outside of folders)
      const fetchWorkspaceForms = async () => {
        dispatch(getWorkspaceFormsRequest());
        const response = await getWorkspaceForms(selectedWorkspace._id); // Get forms from workspace
        if (response.success) {
          dispatch(getWorkspaceFormsSuccess(response)); // Store forms and isSharedWorkspace flag
          dispatch(setAccessLevel(response?.accessLevel));
        } else {
          toast.error("Failed to fetch workspace forms");
        }
      };
      fetchWorkspaceForms();
    }
  }, [selectedWorkspace, dispatch]);

  if (loading || foldersLoading) {
    return <Loader />;
  }

  return (
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
              isSharedWorkspace={isSharedWorkspaceFolders} // Pass isSharedWorkspace flag for folders
              accessLevel={accessLevel}
            />
          )}
        </div>
        <div>
          <Forms
            forms={forms}
            isSharedWorkspace={isSharedWorkspaceForms} // Pass isSharedWorkspace flag for forms
            accessLevel={accessLevel}
          />{" "}
          {/* Pass workspace forms here */}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
