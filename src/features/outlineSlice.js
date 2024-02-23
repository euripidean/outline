import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../utils/index";

export const outlineSlice = createSlice({
  name: "outline",
  initialState: defaultState(),
  reducers: {
    openModal: (state, action) => {
      state.showModal = true;
      state.modalId = action.payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalId = null;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    removeGridCard: (state, action) => {
      // remove the card from state.cards.gridCards and add to state.cards.menuCards
      const id = action.payload;
      const card = state.cards.gridCards.find((card) => card.id === id);
      const newCards = {
        ...state.cards,
        gridCards: state.cards.gridCards.filter((card) => card.id !== id),
        menuCards: [...state.cards.menuCards, card],
      };
      setCards(state, newCards);
    },
    setActiveId: (state, action) => {
      state.activeId = action.payload;
    },
  },
});

export const { openModal, closeModal, setCards, removeGridCard, setActiveId } =
  outlineSlice.actions;

export default outlineSlice.reducer;
