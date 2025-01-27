import { createSlice } from "@reduxjs/toolkit";
import { fetchFilters } from "./fetchFiltersThunk";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  countries: [],
  languages: [],
  selectCategory: "general",
  selectCountry: "US",
  selectLanguage: "en",
  searchQuery: "",
  loading: false,
  error: null,
};

const fetchFiltersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectCategory(state, action) {
      state.selectCategory = action.payload;
      state.searchQuery = "";
    },
    setSelectCountry(state, action) {
      state.selectCountry = action.payload;
      state.searchQuery = "";
    },
    setSelectLanguage(state, action) {
      state.selectLanguage = action.payload;
      state.searchQuery = "";
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Set the search query
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.countries = action.payload.countries;
        state.languages = action.payload.languages;
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectCategory,
  setSelectCountry,
  setSelectLanguage,
  setSearchQuery,
} = fetchFiltersSlice.actions;
export default fetchFiltersSlice.reducer;
