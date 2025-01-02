import React, { useEffect, useState } from "react";
import SidebarOptions from "../components/FormBuilder/SidebarOptions";
import MiddleCanvas from "../components/FormBuilder/MiddleCanvas";
import FormBuilderHeader from "../components/FormBuilder/FormBuilderHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  addFormElement,
  updateFormElement,
  deleteFormElement,
  setFolderForms,
  getWorkspaceFormsRequest,
  getWorkspaceFormsSuccess,
  getWorkspaceFoldersRequest,
  getWorkspaceFoldersSuccess,
  setSelectedFolder,
} from "../redux/reducers/workspaceReducer";
import { useParams } from "react-router-dom";
import styles from "./FormBuilder.module.css";
import { toast } from "react-toastify";
import {
  getWorkspaceForms,
  getWorkspaceFolders,
  getFolderForms,
  saveFormElements,
  getUserDetails,
} from "../utils/apiUtil";

function FormBuilder() {
  const dispatch = useDispatch();
  const { workspaceId, formId, folderId } = useParams();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const forms = useSelector((state) => state.workspace.forms);
  const folders = useSelector((state) => state.workspace.folders);
  const loading = useSelector((state) => state.workspace.loading);
  const error = useSelector((state) => state.workspace.error);
  const [userDetails, setUserDetailsState] = useState(null);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const [isFormModified, setIsFormModifed] = useState(false);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        if (response.success) {
          setUserDetailsState(response.user);
        } else {
          toast.error("Failed to fetch user details");
        }
      } catch (error) {
        toast.error("Failed to fetch user details.");
      }
    };
    fetchUserDetails();
  }, []);

  // Fetch workspace forms and folders based on workspaceId and folderId
  useEffect(() => {
    const fetchWorkspaceData = async () => {
      if (!workspaceId) return;

      // Fetch workspace forms
      dispatch(getWorkspaceFormsRequest());

      try {
        const formsResponse = await getWorkspaceForms(workspaceId);
        if (formsResponse.success) {
          dispatch(getWorkspaceFormsSuccess(formsResponse.forms));

          // Fetch workspace folders
          const foldersResponse = await getWorkspaceFolders(workspaceId);

          if (foldersResponse.success) {
            dispatch(getWorkspaceFoldersSuccess(foldersResponse));

            // If folderId is provided, fetch the forms for that specific folder
            if (folderId && folderId !== "null") {
              const folderResponse = await getFolderForms(
                workspaceId,
                folderId
              );
              if (folderResponse.success) {
                // Set folder forms in state using the setFolderForms action
                dispatch(
                  setFolderForms({ folderId, forms: folderResponse.forms })
                );
              } else {
                toast.error(
                  folderResponse.message || "Failed to fetch folder forms"
                );
              }
            }
          } else {
            toast.error(
              foldersResponse.message || "Failed to fetch workspace folders"
            );
          }
        } else {
          toast.error(
            formsResponse.message || "Failed to fetch workspace forms"
          );
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while fetching workspace data.");
      }
    };

    fetchWorkspaceData();
  }, [dispatch, workspaceId, folderId]);

  // Find the current form based on formId and folderId
  let currentForm = null;
  if (folderId && folderId !== "null") {
    currentForm = (folders || [])
      .flatMap((folder) => folder.forms)
      .find((form) => form._id === formId);
  } else {
    currentForm = forms.find((form) => form._id === formId);
  }

  const formElements = currentForm ? currentForm.elements : [];
  const formName = currentForm ? currentForm.formName : "";

  // Add a new form element
  const handleAddElement = (type) => {
    if (type === "Button" && formElements.some((el) => el.type === "Button")) {
      alert("Only one button is allowed, and it must be at the last position.");
      return;
    }
    const newElement = { id: Date.now(), type, placeholder: "", link: "" };
    if (folderId && folderId !== "null") {
      {
        dispatch(addFormElement({ formId, element: newElement, folderId }));
      }
    } else {
      dispatch(addFormElement({ formId, element: newElement }));
    }
    setIsFormModifed(true);
  };

  // Update form element
  const handleUpdateElement = (id, key, value) => {
    setIsFormModifed(true);
    if (folderId && folderId !== "null") {
      dispatch(
        updateFormElement({ formId, elementId: id, key, value, folderId })
      );
    } else {
      dispatch(updateFormElement({ formId, elementId: id, key, value }));
    }
  };

  // Delete form element
  const handleDeleteElement = (id) => {
    if (folderId && folderId !== "null") {
      dispatch(deleteFormElement({ formId, elementId: id, folderId }));
    } else {
      dispatch(deleteFormElement({ formId, elementId: id }));
    }
    setIsFormModifed(true);
  };

  // Validate form before rendering
  const handleValidation = () => {
    if (formElements.filter((el) => el.type === "Button").length !== 1) {
      alert("Form must have exactly one button.");
      return;
    }
    if (formElements[formElements.length - 1].type !== "Button") {
      alert("Button must be the last element.");
      return;
    }
    return true;
  };

  // Save the form
  const handleSaveForm = async () => {
    try {
      let form = forms.find((form) => form._id === formId);

      if (!form) {
        for (let folder of folders) {
          form = folder.forms.find((form) => form._id === formId);
          if (form) break;
        }
      }

      if (!form) {
        toast.error("Form not found!");
        return;
      }

      const data = {
        formId: form._id,
        elements: form.elements,
      };

      const response = await saveFormElements(data);

      if (response.success) {
        toast.success("Form saved successfully!");
        setIsFormSaved(true);
        setIsFormModifed(false);
      } else {
        toast.error("Failed to save the form. Please try again.");
      }
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("An error occurred while saving the form.");
    }
  };

  return (
    <div>
      <FormBuilderHeader
        handleSaveForm={handleSaveForm}
        formName={formName}
        handleValidation={handleValidation}
        isFormModified={isFormModified}
        isFormSaved={isFormSaved}
      />
      <div
        className={`${styles.container} ${
          darkMode ? styles.containerDark : styles.containerLight
        }`}
      >
        <SidebarOptions onAddElement={handleAddElement} />
        <MiddleCanvas
          formElements={formElements}
          onUpdateElement={handleUpdateElement}
          onDeleteElement={handleDeleteElement}
          onValidation={handleValidation}
        />
      </div>
    </div>
  );
}

export default FormBuilder;
