import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addElementsToForm,
  getFormElements,
  submitForm,
} from "../utils/apiUtil"; // Assume submitForm is your API function
import Loader from "../components/Loader";
import styles from "./FormEntry.module.css"; // Import the CSS module

const FormEntry = () => {
  const { formId, sessionId } = useParams(); // Extract formId and sessionId from URL params

  const [inputs, setInputs] = useState({});
  const [submittedInputs, setSubmittedInputs] = useState({}); // Track submitted inputs
  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});
  const [stepsCompleted, setStepsCompleted] = useState([]); // Track completed steps

  useEffect(() => {
    if (!formId || !sessionId) {
      toast.error("Invalid Link");
      return;
    }

    const getElements = async () => {
      setIsLoading(true);
      const response = await getFormElements(formId);
      if (response.success) {
        setFormData(response.form);
      } else {
        toast.error("Error fetching form data.");
      }
      setIsLoading(false);
    };

    getElements();
  }, [formId, sessionId]);

  const handleInputChange = (id, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  const validateInputs = () => {
    const currentElement = formData.elements[currentStep];
    if (
      currentElement &&
      ["Text", "Email", "Number", "Phone"].includes(currentElement.type)
    ) {
      const inputValue = inputs[currentElement.id] || "";
      if (!inputValue.trim()) {
        toast.error(`Input is required.`);
        return false;
      }
    }
    return true;
  };

  const handleNextStep = async () => {
    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    const currentElement = formData.elements[currentStep];
    if (
      currentElement &&
      ["Text", "Email", "Number", "Phone"].includes(currentElement.type)
    ) {
      const formId = currentElement.formId;
      const elementId = currentElement._id;
      const response = inputs[currentElement.id];
      const apiResponse = await addElementsToForm({
        formId,
        sessionId,
        response,
        elementId,
      });

      if (apiResponse.success) {
        setStepsCompleted((prevSteps) => [...prevSteps, currentStep]);
        setSubmittedInputs((prev) => ({
          ...prev,
          [currentElement.id]: response,
        })); // Mark the input as submitted
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } else {
      setStepsCompleted((prevSteps) => [...prevSteps, currentStep]);
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleImageLoad = (id) => {
    setImageLoading((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const handleImageError = (id) => {
    setImageLoading((prev) => ({
      ...prev,
      [id]: false,
    }));
    toast.error("Image failed to load.");
  };

  useEffect(() => {
    if (
      formData &&
      (formData.elements[currentStep]?.type === "Image" ||
        formData.elements[currentStep]?.type === "Text_Bubble")
    ) {
      const timer = setTimeout(() => {
        handleNextStep();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, formData]);

  if (isLoading || formData === null) {
    return <Loader />;
  }

  const handleFinalSubmit = async () => {
    try {
      const response = await submitForm({ formId, sessionId });
      if (response.success) {
        toast.success("Form submitted successfully.");
      } else {
        toast.error(response.message || "Error submitting form.");
      }
    } catch (error) {
      toast.error(error.message || "Error submitting form.");
    }
  };

  const renderFormElements = () => {
    return (
      <div className={styles.formElementsWrapper}>
        {formData.elements.map((element, index) => {
          const { type, id, link, placeholder } = element;

          // Avatar URL - Replace with the actual user avatar if needed
          const userAvatar =
            "https://res.cloudinary.com/dlmwurg10/image/upload/v1735556185/image_4_ezfuvk.png";

          // If the current element is part of the completed steps, render it
          if (stepsCompleted.includes(index) || index === currentStep) {
            // Static element: Text_Bubble or Image on the left side (with avatar)
            if (type === "Text_Bubble" || type === "Image") {
              return (
                <div key={id} className={styles.formElementWrapper}>
                  <div className={styles.userImageWrapper}>
                    <img
                      src={userAvatar}
                      alt="User Avatar"
                      className={styles.userImage}
                    />
                  </div>
                  <div className={styles.formElement}>
                    {type === "Image" && (
                      <div
                        className={`${styles.textBubble} ${styles.textBubbleWrapper}`}
                      >
                        {imageLoading[id] && (
                          <div className={styles.imageLoadingWrapper}>
                            <Loader />
                          </div>
                        )}
                        <img
                          src={link}
                          alt={`Form Image ${id}`}
                          style={{
                            width: "70%",
                            height: "auto",
                            borderRadius: "8px",
                          }}
                          onLoad={() => handleImageLoad(id)}
                          onError={() => handleImageError(id)}
                        />
                      </div>
                    )}

                    {type === "Text_Bubble" && (
                      <div className={styles.textBubbleWrapper}>
                        <div className={styles.textBubble}>
                          <p>{placeholder}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            // Dynamic input: Text, Email, Number, Phone on the right side (without avatar)
            if (["Text", "Email", "Number", "Phone"].includes(type)) {
              return (
                <div
                  key={id}
                  className={`${styles.formElementWrapper} ${styles.formElementWrapperRight}`}
                >
                  <div className={styles.formElement}>
                    {submittedInputs[id] ? (
                      <div className={styles.textBubbleWrapper}>
                        <div
                          className={`${styles.textBubble} ${styles.textBubbleUser}`}
                        >
                          <p style={{ margin: 0 }}>{submittedInputs[id]}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <input
                          type={type.toLowerCase()}
                          placeholder={placeholder}
                          value={inputs[id] || ""}
                          onChange={(e) =>
                            handleInputChange(id, e.target.value)
                          }
                          className={styles.dynamicInput}
                          disabled={stepsCompleted.includes(index)} // Disable previous inputs
                        />
                        {!stepsCompleted.includes(index) && (
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className={styles.button}
                          >
                            <i class="fa fa-paper-plane" aria-hidden="true"></i>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            }

            // Button element
            if (type === "Button") {
              return (
                <div key={id} className={styles.buttonWrapper}>
                  {index === formData.elements.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      className={styles.button}
                    >
                      Complete Form
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className={styles.button}
                    >
                      Next
                    </button>
                  )}
                </div>
              );
            }
          }

          return null;
        })}
      </div>
    );
  };

  return <div className={styles.formWrapper}>{renderFormElements()}</div>;
};

export default FormEntry;
