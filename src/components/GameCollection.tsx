// src/components/GameCollection.tsx
import React, { useEffect, useState } from 'react';
import Ludopedia from '../Ludopedia';

const GameCollection: React.FC = () => {
  const [games, setGames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGames = async () => {
      const userId = 'someUserId';  // Replace with actual user ID
      const gameName = 'someGameName';  // Replace with actual game name

      console.log("Fetching game collection...");
      const collection = await Ludopedia.requestCollection(userId, gameName);
      console.log("Fetched collection:", collection);

      setGames(collection);
      setLoading(false);
    };

    fetchGames();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {games.map((game, index) => (
        <li key={index}>{game}</li>
      ))}
    </ul>
  );
};

export default GameCollection;
