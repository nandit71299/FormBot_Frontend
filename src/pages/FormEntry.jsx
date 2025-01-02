import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFormElements } from "../utils/apiUtil";
import Loader from "../components/Loader"; // Assuming Loader component is used for a small loader

const FormEntry = () => {
  const { sessionId, formId } = useParams();

  const [inputs, setInputs] = useState({}); // Track user inputs for each element
  const [currentStep, setCurrentStep] = useState(0); // Track the current step in the form
  const [responses, setResponses] = useState([]); // Track the list of user responses
  const [showInput, setShowInput] = useState(true); // Whether to show the input field
  const [formData, setFormData] = useState(null); // Set initial value to null to check if form is still being loaded
  const [isLoading, setIsLoading] = useState(true); // Loading state to show <Loading /> until form is ready
  const [imageLoading, setImageLoading] = useState({}); // Track loading state for each image

  useEffect(() => {
    if (formId === undefined || formId === null || formId === "null") {
      toast.error("Invalid Link");
      return;
    } else {
      const getElements = async (formId) => {
        setIsLoading(true); // Start loading when the request begins
        const response = await getFormElements(formId);
        if (response.success) {
          setFormData(response.form);
        } else {
          toast.error("Invalid Link. Error fetching form.");
        }
        setIsLoading(false); // Stop loading once the form data is fetched
      };
      getElements(formId);
    }
  }, [formId]); // Fetch form data when formId changes

  useEffect(() => {
    console.log("FormData on mount", formData); // Check if formData is updated initially
  }, [formData]);

  // Helper function to handle input changes
  const handleInputChange = (id, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  // Function to move to the next step
  const handleNextStep = () => {
    if (isInputComplete()) {
      const currentElement = formData?.elements?.[currentStep];
      setResponses((prevResponses) => [
        ...prevResponses,
        { id: currentElement.id, value: inputs[currentElement.id] },
      ]);
      setShowInput(false);
      setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
        setShowInput(true);
      }, 1000);
    } else {
      alert("Please fill out the input field before proceeding.");
    }
  };

  // Function to check if the input is complete (non-empty)
  const isInputComplete = () => {
    const currentElement = formData?.elements?.[currentStep];
    if (
      currentElement?.type === "Text" &&
      !inputs[currentElement?.id]?.trim()
    ) {
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form submitted:", inputs);
  };

  // Effect to automatically advance the step for static elements (images, text bubbles)
  useEffect(() => {
    const currentElement = formData?.elements?.[currentStep];

    if (
      currentElement &&
      (currentElement?.type === "Image" ||
        currentElement?.type === "Text_Bubble")
    ) {
      const timeout = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentStep]);

  // Function to handle image load event
  const handleImageLoad = (id) => {
    setImageLoading((prev) => ({
      ...prev,
      [id]: false, // Set image as loaded
    }));
  };

  // Function to handle image error event
  const handleImageError = (id) => {
    setImageLoading((prev) => ({
      ...prev,
      [id]: false, // Set image as loaded even on error (or handle separately)
    }));
    toast.error("Image failed to load.");
  };

  // Render loading component if the form is still loading
  if (isLoading || formData === null) {
    // Make sure formData is loaded before rendering
    return <Loader />;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>{formData.formName}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Loop through the form elements */}
        {formData?.elements?.length > 0 ? (
          formData.elements.map((element, index) => {
            const { type, id, link, placeholder } = element;

            // Render image elements that are static and we have passed the current step
            if (type === "Image" && index <= currentStep) {
              return (
                <div
                  key={id}
                  className="form-element"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "15px",
                    backgroundColor: "rgba(247, 248, 255)",
                    padding: "10px 0px",
                    maxWidth: "200px",
                    position: "relative",
                  }}
                >
                  {imageLoading[id] && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                      }}
                    >
                      <Loader /> {/* Your loader component */}
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
                    onLoad={() => handleImageLoad(id)} // Image loaded
                    onError={() => handleImageError(id)} // Image load failed
                    onLoadStart={() => {
                      setImageLoading((prev) => ({
                        ...prev,
                        [id]: true, // Start loading image
                      }));
                    }}
                  />
                </div>
              );
            }

            // Render text bubble if the element is of type "Text_Bubble" and we are past the current step
            if (type === "Text_Bubble" && index <= currentStep) {
              return (
                <div
                  key={id}
                  className="form-element"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "#f1f1f1",
                      borderRadius: "8px",
                      maxWidth: "80%",
                    }}
                  >
                    <p>{placeholder}</p>
                  </div>
                </div>
              );
            }

            // Render input fields for Text elements only for the current step
            if (type === "Text" && index === currentStep && showInput) {
              return (
                <div
                  key={id}
                  className="form-element"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "15px",
                  }}
                >
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={inputs[id] || ""}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    style={{
                      width: "70%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      marginBottom: "10px",
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    }}
                  />
                  {/* Next button only for Text inputs */}
                  <button
                    type="button"
                    onClick={handleNextStep}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#007BFF",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      width: "20%",
                      marginLeft: "10px",
                    }}
                  >
                    <i
                      className="fa-regular fa-paper-plane"
                      aria-hidden="true"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </button>
                </div>
              );
            }

            return null; // Skip rendering this element if it's not ready to show
          })
        ) : (
          <div style={{ fontSize: "42px" }}>
            No elements in the form. Try checking the URL.
          </div>
        )}

        {/* Conditionally render submit button only when all steps are completed */}
        {currentStep >= formData?.elements?.length && (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                width: "100%",
                maxWidth: "200px",
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormEntry;
