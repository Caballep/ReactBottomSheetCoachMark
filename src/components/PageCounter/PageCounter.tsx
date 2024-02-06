// PageCounter.tsx

import React, { useState, useEffect } from 'react';
import './PageCounter.css';

interface PageCounterProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PageCounter: React.FC<PageCounterProps> = ({ totalPages, currentPage, onPageChange }) => {
  const [pageArray, setPageArray] = useState<string[]>([]);

  useEffect(() => {
    const newArray = Array.from({ length: totalPages }, (_, index) =>
      index === currentPage - 1 ? '•' : '•'
    );
    setPageArray(newArray);
  }, [totalPages, currentPage]);

  const handleClick = (index: number) => {
    onPageChange(index + 1);
  };

  return (
    <div className="page-counter-container">
      <div className="page-counter">
        {pageArray.map((item, index) => (
          <span key={index} className={index === currentPage - 1 ? 'current-page' : ''} onClick={() => handleClick(index)}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PageCounter;
