import { useContext } from "react";
import { GameContext } from "../App";

const useFavorites = () => {
  const { state, dispatch } = useContext(GameContext);

  if (!state || !dispatch) {
    console.error("GameContext no está disponible en useFavorites.");
    return { favorites: [], addFavorite: () => { }, removeFavorite: () => { } };
  }

  return {
    favorites: state.favorites || [],
    addFavorite: (name) => {
      console.log(`Añadiendo a favoritos: ${name}`);
      dispatch({ type: "ADD_FAVORITE", payload: name });
    },
    removeFavorite: (name) => {
      console.log(`Eliminando de favoritos: ${name}`);
      dispatch({ type: "REMOVE_FAVORITE", payload: name });
    },
  };
};

export default useFavorites;