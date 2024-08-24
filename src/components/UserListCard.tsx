import React from 'react';
import { Game } from '../types';
import { GameCollection } from './GameCollection';

interface User {
  id_usuario: string;
  usuario: string;
  nome_legivel: string;
  thumb: string;
}

interface UserListCardProps {
  user: User;
  games: Game[];
  isVisible: boolean;
  toggleVisibility: (userId: string) => void;
  loading: boolean;
  error: string | null;
}

const UserListCard: React.FC<UserListCardProps> = ({ user, games, isVisible, toggleVisibility, loading, error }) => (
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
);

export default UserListCard;