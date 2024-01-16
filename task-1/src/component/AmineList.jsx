import React from "react";

function AmineList({ results }) {
  return (
    <div className="container mt-5">
      {results.map((character) => (
        <div
          class="card mb-3 border-dark  rounded-0 black-bg-with-shadow"
          key={character.id}
        >
          <div class="row g-0">
            <div class="col-md-1 ">
              <img
                src={character.images.webp.image_url}
                class="img-fluid mt-2 ms-2 mb-2"
                alt="..."
              />
            </div>
            <div class="col-md-8 ">
              <div class="card-body">
                <h5 class="card-title">{character.name}</h5>
                {character.nicknames.map((e) => (
                  <small className="d-inline-flex border me-2 pe-2 ps-2 rounded-2 text-secondary border-dark">
                    {e}
                  </small>
                ))}
              </div>
            </div>
            <div class="col-md-2 d-inline-flex d-flex justify-content-end">
              <i
                class="fa fa-heart text-danger mt-3 fs-6"
                aria-hidden="true"
              ></i>
              <samll className="favorites">
                {character.favorites.toLocaleString("en-IN")}
              </samll>
            </div>
            <div class="col-md-1 border-start border-dark arrow-box">
              <i class="fa fa-arrow-right fw-bold fs-1" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AmineList;
