import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = async () => {
    const response = await axios.get(
      "https://api.currentsapi.services/v1/available/categories"
    );
    return response.data.categories || [];
  };
  
  export const fetchCountries = async () => {
    const response = await axios.get(
      "https://api.currentsapi.services/v1/available/regions"
    );
    return Object.entries(response.data.regions || {});
  };
  
  export const fetchLanguages = async () => {
    const response = await axios.get(
      "https://api.currentsapi.services/v1/available/languages"
    );
    return Object.entries(response.data.languages || {});
  };
  
  export const fetchFilters = createAsyncThunk('filters/fetchFilters', async () => {
      const [categories, countries, languages] = await Promise.all([
        fetchCategories(),
        fetchCountries(),
        fetchLanguages(),
      ]);
    
      return {
        categories,
        countries,
        languages,
      };
    });