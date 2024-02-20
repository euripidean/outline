import axios from "axios";

const projectService = {
  createProject: async (projectData) => {
    try {
      const response = await axios.post(`/projects/`, projectData);
      return response.data;
    } catch (error) {
      console.error("Error creating project", error);
    }
  },
  getProject: async (projectId) => {
    try {
      const response = await axios.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting project", error);
    }
  },
  // Not sure if I need to pass the userId here if I'm using JWT on the routes
  getProjects: async (userId) => {
    try {
      const response = await axios.get(`/projects/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting projects", error);
    }
  },
  deleteProject: async (projectId) => {
    try {
      const response = await axios.delete(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting project", error);
    }
  },
};

export default projectService;
