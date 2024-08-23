import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameCollection from './components/GameCollection';
import Ludopedia from './Ludopedia';
import { Game } from './types';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState(''); // State to hold the input value
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update state when input changes
  };

  const handleButtonClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = '104391';  // Replace with actual user ID
      const collection = await Ludopedia.requestCollection(userId, inputValue);
      setGames(collection);
    } catch (err) {
      console.error("Error fetching collection:", err);
      setError("Failed to load game collection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Game Collection</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter game name"
        />
        <button className="btn btn-primary mt-2" onClick={handleButtonClick}>
          Send Request
        </button>
      </div>
      <GameCollection games={games} loading={loading} error={error} />
    </div>
  );
};

export default App;