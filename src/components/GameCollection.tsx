import React from 'react';
import { Game } from '../types';

interface GameCollectionProps {
  games: Game[];
  loading: boolean;
  error: string | null;
}

const GameCollection: React.FC<GameCollectionProps> = ({ games, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="row">
      {games.map((game) => (
        <div key={game.id_jogo} className="col-md-4 mb-4">
          <a href={game.link} className="card h-100 text-decoration-none text-dark">
            <img src={game.thumb} alt={game.nm_jogo} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{game.nm_jogo}</h5>
              <p className="card-text">Rating: {game.vl_nota}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default GameCollection;