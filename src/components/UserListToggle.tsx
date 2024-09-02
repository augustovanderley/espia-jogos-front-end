// components/UserListToggle.tsx
import React, { FC } from 'react';

interface User {
  id_usuario: string;
  usuario: string;
  nome_legivel: string;
  thumb: string;
  priority_search: boolean;
}

interface UserListToggleProps {
  showUserList: boolean;
  toggleUserListVisibility: () => void;
  userCollections: { user: User; games: any[]; isVisible: boolean }[];
}

const UserListToggle: FC<UserListToggleProps> = ({ showUserList, toggleUserListVisibility, userCollections }) => {
  return (
    <div>
      <button 
        className="btn btn-primary mb-3" 
        onClick={toggleUserListVisibility}
      >
        {showUserList ? 'Esconder lista de usuários' : 'Mostrar lista de usuários'}
      </button>
      {showUserList && (
        <ul className="list-group mb-3">
          {userCollections.map(({ user }) => (
            <li key={user.id_usuario} className="list-group-item">
              <img src={user.thumb} alt={user.nome_legivel} className="mr-2" />
              {user.nome_legivel} ({user.usuario})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserListToggle;
