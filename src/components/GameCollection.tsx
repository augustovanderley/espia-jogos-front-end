// src/components/GameCollection.tsx
import React, { useEffect, useState } from 'react';
import Ludopedia from '../Ludopedia';
import { Game } from '../types';

const GameCollection: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const userId = '104391';  // Replace with actual user ID
        const gameName = 'spir';  // Replace with actual game name

        const collection = await Ludopedia.requestCollection(userId, gameName);
        setGames(collection);
      } catch (err) {
        console.error("Error fetching collection:", err);
        setError("Failed to load game collection.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {games.map((game) => (
        <li key={game.id_jogo}>
          <h3>{game.nm_jogo}</h3>
          <img src={game.thumb} alt={game.nm_jogo} />
          <p>Rating: {game.vl_nota}</p>
          <a href={game.link}>More details</a>
        </li>
      ))}
    </ul>
  );
};

export default GameCollection;
