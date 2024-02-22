import { configureStore } from "@reduxjs/toolkit";
import outlineReducer from "../features/outlineSlice";
import { api } from "../features/apiSlice";

export default configureStore({
  reducer: {
    outline: outlineReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
