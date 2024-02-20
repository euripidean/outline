import axios from "axios";

const cardService = {
  createCard: async (cardData) => {
    try {
      const response = await axios.post(`/cards/`, cardData);
      return response.data;
    } catch (error) {
      console.error("Error creating card", error);
    }
  },
  getCard: async (cardId) => {
    try {
      const response = await axios.get(`/cards/${cardId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting card", error);
    }
  },
  // get cards by project id
  getCards: async (projectId) => {
    try {
      const response = await axios.get(`/cards/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting cards", error);
    }
  },
  updateCard: async (cardId, cardData) => {
    try {
      const response = await axios.put(`/cards/${cardId}`, cardData);
      return response.data;
    } catch (error) {
      console.error("Error updating card", error);
    }
  },
  deleteCard: async (cardId) => {
    try {
      const response = await axios.delete(`/cards/${cardId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting card", error);
    }
  },
};

export default cardService;
