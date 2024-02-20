import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultState } from "../utils/index";

export const outlineSlice = createSlice({
  name: "outline",
  initialState: defaultState(),
  reducers: {
    addProject: () => {
      return;
    },
    removeProject: (state, action) => {
      return;
    },
    updateProject: (state, action) => {
      return;
    },
    addCard: (state, action) => {
      return;
    },
    removeCard: (state, action) => {
      return;
    },
    updateCard: (state, action) => {
      return;
    },
    addTag: (state, action) => {
      return;
    },
    removeTag: (state, action) => {
      return;
    },
    updateTag: (state, action) => {
      return;
    },
  },
});
