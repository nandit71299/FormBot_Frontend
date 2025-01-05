import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { generateSessionId } from "../../utils/apiUtil";
import { toast } from "react-toastify";

function RedirectToForm() {
  const { formId } = useParams();
  const [id, setId] = useState(null); // Use state to track the session ID
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (formId && !formId !== undefined) ||
      formId !== null ||
      formId !== "null"
    ) {
      const getUniqueId = async () => {
        try {
          const response = await generateSessionId(formId);
          if (response.success) {
            setId(response.sessionId); // Update the state with the session ID
          } else {
            toast.error(response.message || "Failed to generate session ID.");
          }
        } catch (error) {
          toast.error("An error occurred while generating session ID.");
        }
      };
      getUniqueId();
    }
  }, []);

  useEffect(() => {
    if (id) {
      // Redirect when id is set
      navigate(`/submit/${id}/${formId}`);
    }
  }, [id, navigate]); // Only trigger navigation when id changes

  // Render nothing if the id is still being fetched
  if (id === null) {
    return null;
  }

  // The condition for navigating has been moved to `useEffect`, so no need for Navigate here
}

export default RedirectToForm;
