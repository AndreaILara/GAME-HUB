export const initialState = {
  favorites: [], // Lista de juegos favoritos
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (!state.favorites.some((game) => game.name === action.payload.name)) {
        return { ...state, favorites: [...state.favorites, action.payload] };
      }
      return state;

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((game) => game.name !== action.payload), // 🔥 Ahora elimina correctamente
      };

    default:
      return state;
  }
};
