import { useState } from "react";
import useFavorites from "../../hooks/useFavorites";
import Rating from "../Rating/Rating";
import { toast } from "react-toastify";
import "./GameCard.css";

const GameCard = ({ game }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.includes(game.name);
  const [rating, setRating] = useState(0);

  const handleRating = (newRating, e) => {
    e.stopPropagation(); // Evita abrir el juego
    e.preventDefault(); // Bloquea acciones adicionales
    setRating(newRating);

    toast.success(`⭐ You rated "${game.name}" with ${newRating} hearts!`, {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
    });
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isFavorite) {
      removeFavorite(game.name);
      toast.info(`❌ "${game.name}" removed from favorites!`, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    } else {
      addFavorite(game.name);
      toast.success(`💖 "${game.name}" added to favorites!`, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="game-card">
      <h3>{game.name}</h3>
      <p>{game.description || "No description available."}</p>

      {/* Evita que el clic en el rating abra el juego */}
      <div onClick={(e) => e.stopPropagation()}>
        <Rating onRate={handleRating} />
      </div>

      <button onClick={handleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default GameCard;
