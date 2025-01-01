import React, { useState } from "react";
import SidebarOptions from "../components/FormBuilder/SidebarOptions";
import MiddleCanvas from "../components/FormBuilder/MiddleCanvas";
import styles from "./FormBuilder.module.css";
import FormBuilderHeader from "../components/FormBuilder/FormBuilderHeader";
import { useSelector } from "react-redux";

function FormBuilder() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [formElements, setFormElements] = useState([]);

  // Add a new form element
  const handleAddElement = (type) => {
    if (type === "Button" && formElements.some((el) => el.type === "Button")) {
      alert("Only one button is allowed, and it must be at the last position.");
      return;
    }
    setFormElements([
      ...formElements,
      { id: Date.now(), type, placeholder: "", link: "" },
    ]);
  };

  // Update form element
  const handleUpdateElement = (id, key, value) => {
    setFormElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, [key]: value } : el))
    );
  };

  // Delete form element
  const handleDeleteElement = (id) => {
    setFormElements((prev) => prev.filter((el) => el.id !== id));
  };

  // Validate before rendering the form
  const handleValidation = () => {
    if (formElements.filter((el) => el.type === "Button").length !== 1) {
      alert("Form must have exactly one button.");
      return;
    }
    if (formElements[formElements.length - 1].type !== "Button") {
      alert("Button must be the last element.");
      return;
    }
    alert("Form is valid!");
  };

  return (
    <div>
      <FormBuilderHeader />
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
