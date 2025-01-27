import { createSlice } from "@reduxjs/toolkit";
import { fetchNewsData } from "./fetchNewsThunk";
import { toast } from "react-toastify";

const initialState = {
  articles: [],
  loading: false, // Initial page loading
  loadingMore: false, // Load more spinner
  error: null,
};

const fetchNewsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.loading = true; // Page load spinner
        } else {
          state.loadingMore = true; // Load more spinner
        }
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        // Reset loading states when data is fetched
        state.loading = false;
        state.loadingMore = false;

        if (action.meta.arg.page === 1) {
          state.articles = action.payload; // For initial load
        } else {
          state.articles = [...state.articles, ...action.payload]; // Append more articles
        }
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to fetch articles");
      });
  },
});

export default fetchNewsSlice.reducer;
