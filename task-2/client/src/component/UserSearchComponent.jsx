import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";

const UserSearchComponent = () => {
  const [searchString, setsearchString] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [city, setCity] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(" http://localhost:4000/user");
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSearchResults();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(" http://localhost:4000/user", {
        params: {
          searchString,
          minAge,
          maxAge,
          city,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4 ">User Search</h1>
      <div className="row mt-5">
        <div className="col-md-5">
          <input
            type="text"
            class="form-control rounded-0 border-dark"
            value={searchString}
            placeholder="Search..."
            onChange={(e) => setsearchString(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            value={minAge}
            class="form-control rounded-0 border-dark"
            placeholder="Min Age"
            onChange={(e) => setMinAge(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            placeholder="Max Age"
            value={maxAge}
            class="form-control rounded-0 border-dark"
            onChange={(e) => setMaxAge(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="text"
            class="form-control rounded-0 border-dark"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="col-md-1">
          <button
            className="btn btn-dark border-0 rounded-0"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <List searchResults={searchResults} />
    </div>
  );
};

export default UserSearchComponent;
