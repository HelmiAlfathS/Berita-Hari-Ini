import React from 'react';

const PaginationLink = ({ currentPage, postPerPage, totalPost, goToPage }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumber.map((number) => (
          <li key={number}>
            <a href="#" className="page-link" onClick={() => goToPage(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationLink;
