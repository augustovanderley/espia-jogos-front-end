import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameCollection from './components/GameCollection';
import Ludopedia from './Ludopedia';
import { Game } from './types';

interface User {
  id_usuario: string;
  usuario: string;
  nome_legivel: string;
  thumb: string;
}

interface UserCollection {
  user: User;
  games: Game[];
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState(''); // State to hold the input value
  const [userCollections, setUserCollections] = useState<UserCollection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const response = await fetch('meus_amigos.json');
        const data: User[] = await response.json();
        console.log(data)
        setUserCollections(data.map(user => ({ user, games: [] })));
      } catch (err) {
        console.error("Error fetching user IDs:", err);
        setError("Failed to load user IDs.");
      }
    };

    fetchUserIds();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update state when input changes
  };

  const handleButtonClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const updatedCollections: UserCollection[] = [];
      for (const userCollection of userCollections) {
        const collection = await Ludopedia.requestCollection(userCollection.user.id_usuario, inputValue);
        updatedCollections.push({ user: userCollection.user, games: collection });
      }
      setUserCollections(updatedCollections);
    } catch (err) {
      console.error("Error fetching collections:", err);
      setError("Failed to load game collections.");
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
      {userCollections.map(({ user, games }) => (
        <div key={user.id_usuario}>
          <h2>{user.nome_legivel}</h2>
          <GameCollection games={games} loading={loading} error={error} />
        </div>
      ))}
    </div>
  );
};

export default App;