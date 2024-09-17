import React, { FC } from 'react';
import { Button, List, ListItem, ListItemText, Avatar, Checkbox } from '@mui/material';
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
  selectedUsers: Set<string>;
  onSelectUser: (userId: string) => void;
  selectAllUsers: () => void;
  deselectAllUsers: () => void;
}

const UserListToggle: FC<UserListToggleProps> = ({
  showUserList,
  toggleUserListVisibility,
  userCollections,
  selectedUsers,
  onSelectUser,
  selectAllUsers,
  deselectAllUsers,
}) => {
  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={toggleUserListVisibility}
        endIcon={showUserList ? <ExpandLess /> : <ExpandMore />}
        sx={{ textTransform: 'none' }}
      >
        {showUserList ? 'Esconder lista de colecionadores' : 'Mostrar lista de colecionadores'}
      </Button>
      {showUserList && (
        <>
      <div className="select-buttons">
        <Button
          variant="outlined"
          onClick={selectAllUsers}
          className="mr-2"
          sx={{ textTransform: 'none' }}
        >
          Selecionar Todos
        </Button>
        <Button
          variant="outlined"
          onClick={deselectAllUsers}
          sx={{ textTransform: 'none' }}
        >
          Desmarcar Todos
        </Button>
      </div>
          <List className="mb-3">
            {userCollections.map(({ user }) => (
              <ListItem key={user.id_usuario}>
                <Checkbox
                  checked={selectedUsers.has(user.id_usuario)}
                  onChange={() => onSelectUser(user.id_usuario)}
                />
                <Avatar alt={user.nome_legivel} src={user.thumb} />
                <ListItemText primary={user.nome_legivel} secondary={user.usuario} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

export default UserListToggle;
