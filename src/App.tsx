import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InputForm from './components/InputForm.tsx';
import UserListCard from './components/UserListCard.tsx';
import Ludopedia from './Ludopedia';
import UserListToggle from './components/UserListToggle.tsx'; // Import the new component
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

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const response = await fetch('meus_amigos.json');
        const data: User[] = await response.json();
        const lista_rapida = data.filter(user => user.priority_search);
        setUserCollections(lista_rapida.map(user => ({ user, games: [], isVisible: false })));
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
    try {
      for (const userCollection of userCollections) {
        const collection = await Ludopedia.requestCollection(userCollection.user.id_usuario, inputValue);
        setUserCollections(prevCollections => prevCollections.map(uc =>
          uc.user.id_usuario === userCollection.user.id_usuario
            ? { ...uc, games: collection }
            : uc
        ));
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

  return (
    <div className="game-collection-container">
      <div className="container">
        <UserListToggle 
          showUserList={showUserList} 
          toggleUserListVisibility={toggleUserListVisibility} 
          userCollections={userCollections} 
        />
        <h1 className="mb-4">Espia Jogos</h1>
        <InputForm 
          inputValue={inputValue} 
          onInputChange={handleInputChange} 
          onButtonClick={handleButtonClick} 
          loading={loading} 
        />
        {userCollections
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
