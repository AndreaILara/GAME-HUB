import { useContext } from "react";
import { GameContext } from "../App";

const useFavorites = () => {
  const { state, dispatch } = useContext(GameContext);

  if (!state || !dispatch) {
    console.error("GameContext no está disponible en useFavorites.");
    return { favorites: [], addFavorite: () => { }, removeFavorite: () => { } };
  }

  const addFavorite = (game) => {
    if (!state.favorites.some((fav) => fav.name === game.name)) {
      dispatch({ type: "ADD_FAVORITE", payload: game });
    }
  };

  const removeFavorite = (gameName) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: gameName });
  };

  return {
    favorites: state.favorites || [],
    addFavorite,
    removeFavorite,
  };
};

export default useFavorites;
