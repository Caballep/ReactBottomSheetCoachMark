import React, { useRef, useState } from 'react';
import './BottomSheetCoachMark.css';
import PageCounter from '../PageCounter/PageCounter';

interface BottomSheetCoachMarkProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheetCoachMark: React.FC<BottomSheetCoachMarkProps> = ({ isOpen, onClose, children }) => {
  const [startY, setStartY] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isOpen) return;
    setStartY(event.touches[0].clientY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isOpen || !startY) return;
    const deltaY = event.touches[0].clientY - startY;
    if (deltaY > 50) { // adjust threshold as needed
      onClose();
    }
  };

  const handleTouchEnd = () => {
    setStartY(null);
  };

  // Pages 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {isOpen && <div className="veil" onClick={onClose} />}
      <div
        className={`bottom-sheet ${isOpen ? 'open' : ''}`}
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bottom-sheet-content">
          {children}
          <PageCounter currentPage={1} totalPages={5} onPageChange={handlePageChange}/>
        </div>
      </div>
    </div>
  );
};

export default BottomSheetCoachMark;
