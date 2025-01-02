import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { shareWorkspaceViaLink } from "../utils/apiUtil";

function Sharer() {
  const navigate = useNavigate();
  const { workspaceId, accessLevel } = useParams();
  if (!workspaceId && !accessLevel) {
    toast.error("Invalid Link Provided. Sharing Failed.");
    navigate("/dashboard");
    return;
  } else {
    const shareWorkspace = async () => {
      try {
        const response = await shareWorkspaceViaLink({
          workspaceId,
          accessLevel,
        });
        if (response.success) {
          toast.success("Workspace added successfully");
          navigate(`/dashboard`);
        } else {
          toast.error(response.message || "Failed to share workspace");
          navigate(`/dashboard`);
        }
      } catch (error) {
        toast.error(error.message || "Failed to share workspace");
        navigate(`/dashboard`);
      }
    };
    shareWorkspace();
  }

  return <div></div>;
}

export default Sharer;
