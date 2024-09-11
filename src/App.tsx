import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InputForm from './components/InputForm.tsx';
import UserListCard from './components/UserListCard.tsx';
import Ludopedia from './Ludopedia';
import UserListToggle from './components/UserListToggle.tsx';
import { Game } from './types';

interface User {
  id_usuario: string;
  usuario: string;
  nome_legivel: string;
  thumb: string;
  priority_search: boolean;
}

interface UserCollection {
  user: User;
  games: Game[];
  isVisible: boolean;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [userCollections, setUserCollections] = useState<UserCollection[]>([]);
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const response = await fetch('meus_amigos.json');
        const data: User[] = await response.json();
        setUserCollections(data.map(user => ({ user, games: [], isVisible: false })));
        setSelectedUsers(new Set(data.filter(user => user.priority_search).map(user => user.id_usuario)));
      } catch (err) {
        console.error("Error fetching user IDs:", err);
        setError("Failed to load user IDs.");
      }
    };
  
    fetchUserIds();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    setLoading(true);
    setError(null);
  
    // Clear the existing results by resetting the games array for each user
    setUserCollections(prevCollections => 
      prevCollections.map(userCollection => ({
        ...userCollection,
        games: []
      }))
    );
  
    try {
      for (const userCollection of userCollections) {
        if (selectedUsers.has(userCollection.user.id_usuario)) {
          const collection = await Ludopedia.requestCollection(userCollection.user.id_usuario, inputValue);
          setUserCollections(prevCollections => prevCollections.map(uc =>
            uc.user.id_usuario === userCollection.user.id_usuario
              ? { ...uc, games: collection }
              : uc
          ));
        }
      }
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

  const toggleUserListVisibility = () => {
    setShowUserList(!showUserList);
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(userId)) {
        newSelected.delete(userId);
      } else {
        newSelected.add(userId);
      }
      return newSelected;
    });
  };

  const selectAllUsers = () => {
    const allUserIds = new Set(userCollections.map(uc => uc.user.id_usuario));
    setSelectedUsers(allUserIds);
  };

  const deselectAllUsers = () => {
    setSelectedUsers(new Set());
  };

  return (
    <div className="game-collection-container">
      <div className="container">
        <UserListToggle 
          showUserList={showUserList} 
          toggleUserListVisibility={toggleUserListVisibility} 
          userCollections={userCollections} 
          selectedUsers={selectedUsers}
          onSelectUser={handleSelectUser}
          selectAllUsers={selectAllUsers}
          deselectAllUsers={deselectAllUsers}
        />
        <h1 className="mb-4">Espia Jogos</h1>
        <InputForm 
          inputValue={inputValue} 
          onInputChange={handleInputChange} 
          onButtonClick={handleButtonClick} 
          loading={loading} 
        />
  
        {/* Check if there are no results after filtering */}
        {userCollections
          .filter(({ user }) => selectedUsers.has(user.id_usuario))
          .filter(({ games }) => games.length > 0).length === 0 && !loading && (
            <div className="no-results-message">
              <p>No results found.</p>
            </div>
        )}
  
        {/* Display the user collections if there are results */}
        {userCollections
          .filter(({ user }) => selectedUsers.has(user.id_usuario))
          .filter(({ games }) => games.length > 0)
          .map(({ user, games, isVisible }) => (
            <UserListCard
              key={user.id_usuario}
              user={user}
              games={games}
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
              loading={loading}
              error={error}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
