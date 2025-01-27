import { configureStore } from "@reduxjs/toolkit";
import fetchFiltersSlice from "./main/fetchFiltersSlice";
import fetchNewsSlice from "./main/fetchNewsSlice";

const store = configureStore({
  reducer: {
    filters: fetchFiltersSlice,
    news: fetchNewsSlice,
  },
});

export default store;
