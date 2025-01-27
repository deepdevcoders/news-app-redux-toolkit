import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNewsData = createAsyncThunk(
  "news/fetchNewsData",
  async (
    { selectCountry, selectCategory, selectLanguage, page, searchQuery },
    { rejectWithValue }
  ) => {
    try {
      const APIKEY = process.env.REACT_APP_NEWS_API_KEY;
      const LATEST_NEWS_BASE_URL =
        "https://api.currentsapi.services/v1/latest-news";
      const SEARCH_NEWS_BASE_URL = "https://api.currentsapi.services/v1/search";

      let url;
      if (searchQuery && searchQuery.trim() !== "") {
        url = `${SEARCH_NEWS_BASE_URL}?keywords=${searchQuery}&page_number=${page}&page_size=32&apiKey=${APIKEY}`;
      } else {
        url = `${LATEST_NEWS_BASE_URL}?language=${selectLanguage}&category=${selectCategory}&country=${selectCountry}&page_number=${page}&page_size=32&apiKey=${APIKEY}`;
      }

      const { data } = await axios.get(url);

      if (data.status === "ok") {
        return data.news;
      } else {
        return rejectWithValue(data.message || "Failed to fetch articles");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
