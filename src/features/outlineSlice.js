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
  },
});

export const { openModal, closeModal } = outlineSlice.actions;

export default outlineSlice.reducer;
