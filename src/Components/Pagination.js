import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNeighbours = 1;
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    const startPage = Math.max(1, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages, currentPage + pageNeighbours);

    const pagesToShow = [];
    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (startPage > 1) {
      pagesToShow.unshift('...');
    }

    if (endPage < totalPages) {
      pagesToShow.push('...');
    }

    return pagesToShow;
  };

  return (
    <div >
      <ul className="pagination">
        <li onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <button className="page-link">Previous</button>
        </li>
        {getPageNumbers().map((pageNumber, index) => (
          <li
            key={index}
            onClick={() => onPageChange(pageNumber)}
            className={`page-item ${pageNumber === currentPage ? 'active' : ''} `}
          >
            <button className="page-link">{pageNumber}</button>
          </li>
        ))}
        <li onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <button className="page-link">Next</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
