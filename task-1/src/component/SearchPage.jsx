import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import AmineList from "./AmineList";
import Pagination from "./Pagination";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [noResults, setNoResults] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const apiUrl = "https://api.jikan.moe/v4/characters";
  const limit = 15;

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(
        `${apiUrl}?page=${currentPage}&limit=${limit}&q=${searchQuery}&order_by=favorites&sort=desc`
      );
      const data = await response.json();

      if (data.data) {
        setResults(data.data);
        setTotalItem(data.pagination.items.total);
        setTotalPages(data.pagination.last_visible_page);
        setNoResults(data.data.length === 0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePagination = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [currentPage, searchQuery]);

  return (
    <div>
      <SearchBox
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        total={totalItem}
      />
      {noResults ? (
        <div className="text-white d-flex justify-content-center mt-5 pt-5 fs-4">
          <span className="align-self-center">No results found!</span>
        </div>
      ) : (
        <>
          <AmineList results={results} />
          <Pagination
            handlePagination={handlePagination}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;
