import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../utils/index";

export const outlineSlice = createSlice({
  name: "outline",
  initialState: defaultState(),
  reducers: {
    setOutline: (state, action) => {
      state.outline = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { setOutline, setProjects, setCards, setUsers, setLoggedInUser } =
  outlineSlice.actions;

export default outlineSlice.reducer;
