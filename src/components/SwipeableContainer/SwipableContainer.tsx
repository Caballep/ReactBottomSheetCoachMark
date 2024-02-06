import React, { useState, ReactNode } from 'react';

interface SwipeableComponentProps {
  children: ReactNode[];
}

const SwipeableComponent: React.FC<SwipeableComponentProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalChildren = React.Children.count(children);

  const handleSwipe = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    const swipeThreshold = 50; // adjust as needed
    const startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    let moveX = 0;

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      moveX = ('touches' in moveEvent ? (moveEvent as TouchEvent).touches[0].clientX : (moveEvent as MouseEvent).clientX);
    };

    const handleEnd = () => {
      const diff = moveX - startX;
      if (diff > swipeThreshold && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1); // Swipe right
      } else if (-diff > swipeThreshold && currentIndex < totalChildren - 1) {
        setCurrentIndex(currentIndex + 1); // Swipe left
      }
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
  };

  return (
    <div style={{ width: '100%', position: 'relative' }} onMouseDown={handleSwipe} onTouchStart={handleSwipe}>
      {React.Children.map(children, (child, index) => (
        <div style={{ display: index === currentIndex ? 'block' : 'none' }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default SwipeableComponent;
