// src/App.tsx
import React from 'react';
import GameCollection from './components/GameCollection';

const App: React.FC = () => {
  return (
    <div>
      <h1>Game Collection</h1>
      <GameCollection />
    </div>
  );
};

export default App;
