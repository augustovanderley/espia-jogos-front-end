// components/UserListToggle.tsx
import React, { FC } from 'react';
import { Button, List, ListItem, ListItemText, Avatar, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

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
      <Button 
        variant="contained" 
        color="primary" 
        onClick={toggleUserListVisibility}
        endIcon={showUserList ? <ExpandLess /> : <ExpandMore />}
      >
        {showUserList ? 'Esconder lista de usuários' : 'Mostrar lista de usuários'}
      </Button>
      {showUserList && (
        <List className="mb-3">
          {userCollections.map(({ user }) => (
            <ListItem key={user.id_usuario}>
              <Avatar alt={user.nome_legivel} src={user.thumb} />
              <ListItemText primary={user.nome_legivel} secondary={user.usuario} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default UserListToggle;
