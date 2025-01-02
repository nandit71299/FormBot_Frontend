import axios from "axios";

const API_PORT = import.meta.env?.VITE_API_PORT || "";
const api_url = import.meta.env.VITE_API_URL;
let API_URL;
if (API_PORT.length < 1) {
  API_URL = `${api_url}/api`;
} else {
  API_URL = `${api_url}:${API_PORT}/api`;
}

export const verifyToken = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await axios.get(`${API_URL}/auth/authenticate`, {
        headers: { Authorization: token },
      });
      return response.data;
    } else {
      return {
        success: false,
        message: "Please Login.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to authenticate user",
    };
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to register.");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to login.");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const toggleAppTheme = async (mode) => {
  try {
    const response = await axios.put(
      `${API_URL}/theme/change-theme?theme=${mode}`,
      null,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return new Error(
        error.response.data.message || "Failed to toggle theme."
      );
    } else {
      return new Error("Failed to toggle theme.");
    }
  }
};

export const getWorkspacesFromServer = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/workspace/getAllWorkspaces`,
      null,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return new Error(
        error.response.data.message || "Failed to fetch workspaces."
      );
    } else {
      return new Error("Failed to toggle theme.");
    }
  }
};

export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await axios.get(`${API_URL}/auth/getUserDetails`, {
        headers: {
          authorization: token, // Directly pass the token as 'authorization'
        },
      });

      if (response.data.success) {
        return response.data;
      } else {
        return {
          success: false,
          message: "Failed to fetch workspaces.",
        };
      }
    } else {
      return {
        success: false,
        message: "Please Login.",
      };
    }
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to fetch workspaces.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const getWorkspaceFolders = async (workspaceId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(`${API_URL}/folder/${workspaceId}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      return response.data;
    } else {
      return {
        success: false,
        message: "Failed to fetch folders.",
      };
    }
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to fetch folders.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const getWorkspaceForms = async (workspaceId) => {
  try {
    const response = await axios.get(`${API_URL}/forms/${workspaceId}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to fetch forms.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const createFolder = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/folder/create/${data.workspaceId}`,
      data,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to create folder.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const createForm = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/forms/create/${data.workspaceId}`,
      data,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to create form.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const getFolderForms = async (workspaceId, folderId) => {
  try {
    const response = await axios.get(
      `${API_URL}/forms/${workspaceId}/${folderId}`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to fetch folder forms.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const createFormInsideFolder = async (
  workspaceId,
  folderId,
  formName
) => {
  try {
    const response = await axios.post(
      `${API_URL}/forms/create/${workspaceId}/${folderId}`,
      { formName },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.message || "Failed to create form inside folder.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const inviteByEmail = async (email, access) => {
  try {
    const response = await axios.post(
      `${API_URL}/workspace/shareworkspace/${email}/${access}`,
      null,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to invite user.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const deleteFolder = async (workspaceId, folderId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/folder/delete/${workspaceId}/${folderId}`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to delete folder.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const deleteForm = async (workspaceId, folderId, formId) => {
  try {
    // Check if folderId is defined, otherwise omit it from the URL
    const url = folderId
      ? `${API_URL}/forms/delete/${workspaceId}/${formId}/${folderId}`
      : `${API_URL}/forms/delete/${workspaceId}/${formId}`;

    const response = await axios.delete(url, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to fetch folder forms.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/auth/update-profile`, data, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to update profile.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const shareWorkspaceViaLink = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/workspace/shareworkspace/link`,
      data,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.message || "Failed to share workspace via link.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const saveFormElements = async (data) => {
  try {
    const response = await axios.put(
      `${API_URL}/forms/saveformelements`,
      data,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Failed to save form elements.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const generateSessionId = async () => {
  try {
    const response = await axios.get(`${API_URL}/forms/generate-session-id`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.message || "Failed to generate session ID.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const getFormElements = async (formId) => {
  try {
    const response = await axios.get(
      `${API_URL}/forms/getformelements/${formId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.message || "Failed to fetch form elements.",
      };
    } else {
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};
