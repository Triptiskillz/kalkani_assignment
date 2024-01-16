import React from "react";

function Pagination({ handlePagination, currentPage, totalPages }) {
  return (
    <div className="container mt-5 mb-5 ">
      <button
        className="btn btn-primary text-white rounded-0 border-0"
        onClick={() => handlePagination("prev")}
        disabled={currentPage === 1}
      >
        Back
      </button>
      <span className="text-white pe-5 ps-5">Page {currentPage}</span>
      <button
        className="btn btn-primary text-white rounded-0 border-0"
        onClick={() => handlePagination("next")}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
