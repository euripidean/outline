import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../utils/index";

export const outlineSlice = createSlice({
  name: "outline",
  initialState: defaultState(),
  reducers: {
    openModal: (state, action) => {
      state.showModal = true;
      state.modalId = action.payload;
      state.modalAction = action.payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalId = null;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    removeCardFromGrid: (state, action) => {
      // remove the card from state.cards.gridCards and add to state.cards.menuCards
      const id = action.payload;
      // find the card with the id and if it's in gridCards, remove it and add it to menuCards
      const gridIndex = state.cards.gridCards.findIndex(
        (card) => card.id === id
      );
      if (gridIndex !== -1) {
        const card = state.cards.gridCards[gridIndex];
        state.cards.gridCards.splice(gridIndex, 1);
        state.cards.menuCards.push(card);
      } else {
        console.log("Card not found in gridCards");
      }
    },
    addCardToGrid: (state, action) => {
      const id = action.payload;
      const menuIndex = state.cards.menuCards.findIndex(
        (card) => card.id === id
      );
      if (menuIndex !== -1) {
        const card = state.cards.menuCards[menuIndex];
        state.cards.menuCards.splice(menuIndex, 1);
        state.cards.gridCards.push(card);
      } else {
        console.log("Card not found in menuCards");
      }
    },
    setActiveId: (state, action) => {
      state.activeId = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  setCards,
  removeCardFromGrid,
  addCardToGrid,
  setActiveId,
} = outlineSlice.actions;

export default outlineSlice.reducer;
