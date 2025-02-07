import { useEffect, useState } from "react";
import GameCard from "../../components/GameCard/GameCard";
import useFavorites from "../../hooks/useFavorites";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [localFavorites, setLocalFavorites] = useState(favorites);

  useEffect(() => {
    setLocalFavorites(favorites); // 🔥 Sincroniza el estado global con el local
  }, [favorites]);

  const handleRemoveFavorite = (gameName) => {
    removeFavorite(gameName);
    setLocalFavorites((prev) => prev.filter((game) => game.name !== gameName)); // 🔥 Elimina visualmente
  };

  return (
    <div className="favorites-page">
      <h1>Your Favorite Games</h1>
      <div className="favorites-container">
        {localFavorites.length > 0 ? (
          localFavorites.map((game) => (
            <GameCard
              key={game.name}
              game={game}
              customAction={() => handleRemoveFavorite(game.name)} // 🔥 Actualiza la UI inmediatamente
              customButtonLabel="Remove"
            />
          ))
        ) : (
          <p>No favorite games added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;

