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
  isVisible: boolean; // Add visibility state for each user
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
        setUserCollections(data.map(user => ({ user, games: [], isVisible: false })));
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
        updatedCollections.push({ ...userCollection, games: collection });
      }
      setUserCollections(updatedCollections);
    } catch (err) {
      console.error("Error fetching collections:", err);
      setError("Failed to load game collections.");
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = (userId: string) => {
    setUserCollections(userCollections.map(userCollection =>
      userCollection.user.id_usuario === userId
        ? { ...userCollection, isVisible: !userCollection.isVisible }
        : userCollection
    ));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Game Collection</h1>
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
      {userCollections
        .filter(({ games }) => games.length > 0) // Filter out users with empty collections
        .map(({ user, games, isVisible }) => (
          <div key={user.id_usuario} className="card mb-4" onClick={() => toggleVisibility(user.id_usuario)} style={{ cursor: 'pointer' }}>
            <div className="card-header d-flex align-items-center">
              <img src={user.thumb} alt={user.nome_legivel} className="rounded-circle me-3" style={{ width: '50px', height: '50px' }} />
              <h2 className="h5 mb-0">{user.nome_legivel}</h2>
              {!isVisible && (
                <div className="d-flex flex-wrap ms-3">
                  {games.slice(0, 5).map((game, index) => (
                    <img key={index} src={game.thumb} alt={game.nm_jogo} className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                  ))}
                  {games.length > 5 && <span className="ms-2">+{games.length - 5} more</span>}
                </div>
              )}
              <span className="ms-auto">{isVisible ? '▲' : '▼'}</span>
            </div>
            <div className={`card-body ${isVisible ? '' : 'd-none'}`}>
              <GameCollection games={games} loading={loading} error={error} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;