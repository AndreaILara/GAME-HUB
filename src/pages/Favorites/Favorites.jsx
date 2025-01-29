import GameCard from "../../components/GameCard/GameCard";
import useFavorites from "../../hooks/useFavorites";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  return (
    <div className="favorites-page">
      <h1>Your Favorite Games</h1>
      <div className="favorites-container">
        {favorites.length > 0 ? (
          favorites.map((game) => (
            <GameCard key={game} game={{ name: game }} customAction={() => removeFavorite(game)} customButtonLabel="Remove" />
          ))
        ) : (
          <p>No favorite games added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
