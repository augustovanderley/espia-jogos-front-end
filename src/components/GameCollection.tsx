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
    <ul className="list-group">
      {games.map((game) => (
        <li key={game.id_jogo} className="list-group-item d-flex justify-content-between align-items-center">
          <div className="ms-2 me-auto">
            <div className="fw-bold">{game.nm_jogo}</div>
            <img src={game.thumb} alt={game.nm_jogo} className="img-thumbnail" />
            <p>Rating: {game.vl_nota}</p>
          </div>
          <a href={game.link} className="btn btn-primary">More details</a>
        </li>
      ))}
    </ul>
  );
};

export default GameCollection;