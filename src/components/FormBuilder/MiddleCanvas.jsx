import React from "react";
import styles from "./MiddleCanvas.module.css";
import { useSelector } from "react-redux";

function MiddleCanvas({
  formElements,
  onUpdateElement,
  onValidation,
  onDeleteElement,
}) {
  const getDynamicNumber = (type, id) => {
    const filteredElements = formElements.filter((el) => el.type === type);
    const index = filteredElements.findIndex((el) => el.id === id);
    return index + 1; // Dynamic numbering starts from 1
  };

  const darkMode = useSelector((state) => state.theme.darkMode);

  // Map all element types to icons and colors
  const typeDetails = {
    // Bubble options (blue)
    Text_Bubble: {
      icon: "fa-regular fa-message",
      color: "rgba(75, 131, 255, 1)",
    },
    Image: { icon: "fa-regular fa-image", color: "rgba(75, 131, 255, 1)" },
    Video: { icon: "fa-solid fa-film", color: "rgba(75, 131, 255, 1)" },
    GIF: { icon: "fa-solid fa-gif", color: "rgba(75, 131, 255, 1)" },
    // Input options (yellow)
    Text: { icon: "fa-solid fa-t", color: "rgba(255, 165, 76, 1)" },
    Number: { icon: "fa-solid fa-hashtag", color: "rgba(255, 165, 76, 1)" },
    Email: { icon: "fa-solid fa-at", color: "rgba(255, 165, 76, 1)" },
    Phone: { icon: "fa-solid fa-phone", color: "rgba(255, 165, 76, 1)" },
    Date: { icon: "fa-regular fa-calendar", color: "rgba(255, 165, 76, 1)" },
    Rating: { icon: "fa-regular fa-star", color: "rgba(255, 165, 76, 1)" },
    Button: {
      icon: "fa-regular fa-square-check",
      color: "rgba(255, 165, 76, 1)",
    },
  };
  return (
    <div className={`${styles.canvas} ${!darkMode && styles.canvasLight}`}>
      <div
        className={`${styles.startHeadingContainer} ${
          darkMode
            ? styles.startHeadingContainerDark
            : styles.startHeadingContainerLight
        }`}
      >
        <i
          className="fa-solid fa-flag"
          style={{
            fontSize: "40px",
            color: !darkMode ? "blue" : "white",
          }}
        ></i>
        <h3 className={styles.startHeading}>Start</h3>
      </div>
      <div className={styles.elementsContainer}>
        {formElements.map((element) => (
          <div
            key={element.id}
            className={`${styles.element} ${
              darkMode ? styles.elementDark : styles.elementLight
            }`}
          >
            <div className={styles.header}>
              <label className={styles.elementLabel}>
                {element.type} {getDynamicNumber(element.type, element.id)}
              </label>
              <i
                className={`fa-solid fa-trash-can ${styles.deleteButton} ${
                  darkMode ? styles.deleteButtonDark : styles.deleteButtonLight
                }`}
                onClick={() => onDeleteElement(element.id)}
              ></i>
            </div>
            <div className={styles.inputContainer}>
              {/* Dynamic Icon */}
              <i
                className={
                  typeDetails[element.type]?.icon ||
                  typeDetails[`${element.type}_Bubble`]?.icon
                }
                style={{
                  color:
                    typeDetails[element.type]?.color ||
                    typeDetails[`${element.type}_Bubble`]?.color,
                }}
              ></i>
              {element.type === "Image" ? (
                <input
                  type="text"
                  placeholder="Add link"
                  value={element.link}
                  onChange={(e) =>
                    onUpdateElement(element.id, "link", e.target.value)
                  }
                  className={`${styles.inputWithIcon} ${
                    darkMode
                      ? styles.inputWithIconDark
                      : styles.inputWithIconLight
                  }`}
                />
              ) : (
                <input
                  type="text"
                  placeholder={`Enter ${element.type} placeholder`}
                  value={element.placeholder}
                  onChange={(e) =>
                    onUpdateElement(element.id, "placeholder", e.target.value)
                  }
                  className={`${styles.inputWithIcon} ${
                    darkMode
                      ? styles.inputWithIconDark
                      : styles.inputWithIconLight
                  }`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <button className={styles.validateButton} onClick={onValidation}>
        Validate Form
      </button>
    </div>
  );
}

export default MiddleCanvas;
