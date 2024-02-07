import React, { useState, ReactNode, useEffect, useRef } from 'react';
import './SwipableContainer.css';

interface SwipeableComponentProps {
  children: ReactNode[];
  onChildChange: (index: number) => void;
}

const SwipeableContainer: React.FC<SwipeableComponentProps> = ({ children, onChildChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalChildren = React.Children.count(children);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChildChange(currentIndex);
  }, [currentIndex, onChildChange]);

  const handleSwipe = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    const swipeThreshold = 50;
    const startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    let moveX = 0;

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      moveX = 'touches' in moveEvent ? (moveEvent as TouchEvent).touches[0].clientX : (moveEvent as MouseEvent).clientX;
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

  const containerStyle: React.CSSProperties = {
    transform: `translateX(-${currentIndex * (100)}%)`, // Adjust translateX based on currentIndex
  };

  return (
    <div className="swipeable-container" onMouseDown={handleSwipe} onTouchStart={handleSwipe}>
      <div className="swipeable-content" style={containerStyle} ref={containerRef}>
        {React.Children.map(children, (child, index) => (
          <div className={`swipeable-child`} key={index}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwipeableContainer;
