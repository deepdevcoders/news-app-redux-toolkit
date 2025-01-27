import React, { useEffect, useState } from "react";
import { ClipLoader, PulseLoader } from "react-spinners";
import Card from "../components/Card";
import FilterTabs from "../components/FilterTabs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsData } from "../store/main/fetchNewsThunk";
import {
  setSearchQuery,
  setSelectCategory,
  setSelectCountry,
  setSelectLanguage,
} from "../store/main/fetchFiltersSlice";

function Home() {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { selectCategory, selectCountry, selectLanguage, searchQuery } =
    useSelector((state) => state.filters);
  const { articles, loading, loadingMore, error } = useSelector(
    (state) => state.news
  );

  const fetchNews = () => {
    const params = {
      selectCategory,
      selectCountry,
      selectLanguage,
      page,
      searchQuery,
    };
    dispatch(fetchNewsData(params));
  };

  const handleSearch = (newQuery) => {
    dispatch(setSearchQuery(newQuery));
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchNews(page > 1);
  }, [selectCategory, selectCountry, selectLanguage, searchQuery, page]);

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={handleSearch} />
      <FilterTabs
        setSelectCategory={(value) => dispatch(setSelectCategory(value))}
        setSelectCountry={(value) => dispatch(setSelectCountry(value))}
        setSelectLanguage={(value) => dispatch(setSelectLanguage(value))}
      />
      <div className="bg-gray-100 w-full">
        {loading ? (
          <div className="text-center py-6">
            <PulseLoader color="#000" size="20" />
          </div>
        ) : (
          <>
            <Card cardsData={articles} hightLightedText={searchQuery} />
            <div className="text-center py-6">
              {articles?.length < 200 ? (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 shadow-lg text-sm font-sans ${
                    loadingMore
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                >
                  {loadingMore ? (
                    <ClipLoader color="#fff" size="18" />
                  ) : (
                    "Load More"
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 shadow-lg text-sm font-sans cursor-not-allowed opacity-60"
                >
                  No more Data
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
