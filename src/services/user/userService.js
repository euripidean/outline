import axios from "axios";

const userService = {
  createUser: async (userData) => {
    try {
      const response = await axios.post(`/users/`, userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user", error);
    }
  },
  getUser: async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting user", error);
    }
  },
  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user", error);
    }
  },
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user", error);
    }
  },
};

export default userService;
