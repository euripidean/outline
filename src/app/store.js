import { configureStore } from "@reduxjs/toolkit";
import outlineReducer from "../features/outlineSlice";

export default configureStore({
  reducer: {
    outline: outlineReducer,
  },
});
