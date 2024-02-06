// App.tsx

import React, { useState, useEffect } from 'react';
import BottomSheetCoachMark from './components/BottomSheetCoachMark/BottomSheetCoachMark';
import Content from './components/Content/Content';
import SwipeableComponent from './components/SwipeableContainer/SwipableContainer';
import PageCounter from './components/PageCounter/PageCounter';

const App: React.FC = () => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBottomSheetOpen(true);
    }, 100); 

    return () => clearTimeout(timeout);
  }, []);

  const toggleBottomSheet = () => {
    setBottomSheetOpen(!bottomSheetOpen);
  };

  const closeBottomSheet = () => {
    setBottomSheetOpen(false);
  };





  return (
    <div>
      {/* <button onClick={toggleBottomSheet}>Open Bottom Sheet</button> */}
      
      <BottomSheetCoachMark isOpen={bottomSheetOpen} onClose={closeBottomSheet}>
        <SwipeableComponent>
        <Content tagType='announcement' text1='Some text to show' text2='To address the TypeScript error you are encountering, you can explicitly define the types of the props in the component.' text3='TypeScript knows the types of the props being passed to the component.'/>
        <Content tagType='offer' text1='Beep boop beep' text2='React application and then use it as a wrapper for the components you want to swipe through. ' text3='To address the TypeScript error regarding the implicit...'/>
        <Content tagType='alert' text1='Mazda Mx5 RF' text2='Implement swipe detection using either touch events or mouse events.' text3='Lalalalalala lalalalalala lalalalala.'/>
        </SwipeableComponent>
      </BottomSheetCoachMark>
    </div>
  );
};

export default App;
