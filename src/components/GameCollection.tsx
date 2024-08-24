import React from 'react';
import { Game } from '../types';
import '../styles/GameCollection.css'; // Import the CSS file

interface GameCollectionProps {
  games: Game[];
  loading: boolean;
  error: string | null;
}

export const GameCollection: React.FC<GameCollectionProps> = ({ games, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="row justify-content-center">
      {games.map((game) => (
        <div key={game.id_jogo} className="col-md-4 mb-4">
          <a href={game.link} className="card h-100 text-decoration-none text-dark">
            <img 
              src={game.thumb} 
              alt={game.nm_jogo} 
              className="game-thumbnail" 
            />
            <div className="card-body text-center">
              <h5 className="card-title">{game.nm_jogo}</h5>
              <p className="card-text">Rating: {game.vl_nota}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  )
};

export default GameCollection;