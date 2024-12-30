import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}:${
  import.meta.env.VITE_API_PORT
}/api`;

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
    const response = await axios.put(`${API_URL}/theme/${mode}`, null, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
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
      console.error("Error response:", error.response); // Log error response
      return {
        success: false,
        message: error.response.data.message || "Failed to fetch workspaces.",
      };
    } else {
      console.error("Error:", error); // Log generic error
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
      console.error("Error response:", error.response); // Log error response
      return {
        success: false,
        message: error.response.data.message || "Failed to fetch folders.",
      };
    } else {
      console.error("Error:", error); // Log generic error
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};

export const getWorkspaceForms = async (workspaceId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/forms/${workspaceId}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response); // Log error response
      return {
        success: false,
        message: error.response.data.message || "Failed to fetch forms.",
      };
    } else {
      console.error("Error:", error); // Log generic error
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
      console.error("Error response:", error.response); // Log error response
      return {
        success: false,
        message: error.response.data.message || "Failed to create folder.",
      };
    } else {
      console.error("Error:", error); // Log generic error
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
      console.error("Error response:", error.response); // Log error response
      return {
        success: false,
        message: error.response.data.message || "Failed to create form.",
      };
    } else {
      console.error("Error:", error); // Log generic error
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
      console.error("Error response:", error.response); // Log error response
      return {
        success: false,
        message: error.response.data.message || "Failed to fetch folder forms.",
      };
    } else {
      console.error("Error:", error); // Log generic error
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
      console.error("Error response:", error.response); // Log error response
      return {
        success: false,
        message:
          error.response.data.message || "Failed to create form inside folder.",
      };
    } else {
      console.error("Error:", error); // Log generic error
      return {
        success: false,
        message: error.message || "An error occurred.",
      };
    }
  }
};
