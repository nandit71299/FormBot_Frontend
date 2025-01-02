import React from "react";
import styles from "./SidebarOptions.module.css";
import { Tooltip } from "react-tooltip";
import { useSelector } from "react-redux";

// Bubble options
const bubbles = [
  {
    icon: "fa-regular fa-message",
    label: "Text_Bubble",
    color: "rgba(75, 131, 255, 1)",
  },
  {
    icon: "fa-regular fa-image",
    label: "Image",
    color: "rgba(75, 131, 255, 1)",
  },
  {
    icon: "fa-solid fa-film",
    label: "Video",
    color: "rgba(75, 131, 255, 1)",
    disabled: true,
  },
  {
    icon: "fa-solid fa-gif",
    label: "GIF",
    color: "rgba(75, 131, 255, 1)",
    disabled: true,
  },
];

// Input options
const options = [
  { icon: "fa-solid fa-t", label: "Text", color: "rgba(255, 165, 76, 1)" },
  {
    icon: "fa-solid fa-hashtag",
    label: "Number",
    color: "rgba(255, 165, 76, 1)",
  },
  { icon: "fa-solid fa-at", label: "Email", color: "rgba(255, 165, 76, 1)" },
  { icon: "fa-solid fa-phone", label: "Phone", color: "rgba(255, 165, 76, 1)" },
  {
    icon: "fa-regular fa-calendar",
    label: "Date",
    color: "rgba(255, 165, 76, 1)",
  },
  {
    icon: "fa-regular fa-star",
    label: "Rating",
    color: "rgba(255, 165, 76, 1)",
  },
  {
    icon: "fa-regular fa-square-check",
    label: "Button",
    color: "rgba(255, 165, 76, 1)",
  },
];

function SidebarOptions({ onAddElement }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`${styles.sidebar} ${
        darkMode ? styles.sidebarDark : styles.sidebarLight
      }`}
    >
      <h3 className={styles.sectionTitle}>Bubbles</h3>
      <div className={styles.bubblesContainer}>
        {bubbles.map((option) => (
          <div
            key={option.label}
            className={`${styles.bubbleItem} ${
              darkMode ? styles.bubbleItemDark : styles.bubbleItemLight
            }`}
          >
            <i className={option.icon} style={{ color: option.color }}></i>{" "}
            {/* Icon for bubble */}
            <button
              data-tooltip-id={`disabled-to-add-${option.label}`}
              className={`${styles.optionButton} ${
                darkMode ? styles.optionButtonDark : styles.optionButtonLight
              }`}
              onClick={() => onAddElement(option.label)}
              disabled={option?.disabled ? true : false}
              style={{ cursor: option?.disabled ? "not-allowed" : "pointer" }}
            >
              {option.label === "Text_Bubble" ? "Text" : option.label}
            </button>
            {option?.disabled ? (
              <Tooltip
                id={`disabled-to-add-${option.label}`}
                place="bottom"
                content="Will be released in upcoming updates"
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle}>Options</h3>
      <div className={styles.bubblesContainer}>
        {options.map((option) => (
          <div
            key={option.label}
            className={`${styles.bubbleItem} ${
              darkMode ? styles.bubbleItemDark : styles.bubbleItemLight
            }`}
          >
            <i className={option.icon} style={{ color: option.color }}></i>{" "}
            {/* Icon for option */}
            <button
              className={`${styles.optionButton} ${
                darkMode ? styles.optionButtonDark : styles.optionButtonLight
              }`}
              onClick={() => onAddElement(option.label)}
              style={{ cursor: option?.disabled ? "not-allowed" : "pointer" }}
            >
              {option.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarOptions;
