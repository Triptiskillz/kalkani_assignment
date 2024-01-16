import React from "react";
import { Link } from "react-router-dom";
function List({ searchResults }) {
  return (
    <div class="row mt-5 text-center d-flex justify-content-center ">
      {searchResults.length == 0 ? (
        <p className="text-center mt-5">No Data Found!</p>
      ) : (
        searchResults.map((user) => (
          <div
            class="card col-md-3 g-2 shadow-sm  m-2 border-dark rounded-0"
            key={user.user_id}
          >
            <div class="card-body">
              <h5 class="card-title ">
                {user.first_name} {user.last_name}
              </h5>
              <p class="card-text">
                <b> Email: </b>
                {user.email}
                <br />
                <b>Phone: </b>
                {user.mobile_number}
                <br />
                <b>Birthdate:</b> {user.birthdate.split("T")[0]}
              </p>
              <Link
                to={`/edit/${user.user_id}`}
                className="btn btn-dark btn-block w-100 border-0 rounded-0"
              >
                {" "}
                Edit
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default List;
