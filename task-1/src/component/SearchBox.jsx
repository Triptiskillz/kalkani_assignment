import React from "react";

function SearchBox({ searchQuery, handleSearch, total }) {
  return (
    <div>
      <div className="container-search">
        <div>
          <h1>Search Anime Characters</h1>

          <div className="search-box mt-5">
            <i className="fas fa-search"></i>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search anime characters..."
            />
          </div>

          <p>Total {total} matching anime characters found</p>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
