export const initialState = {
  favorites: [], // Lista de juegos favoritos
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((game) => game !== action.payload),
      };
    default:
      return state;
  }
};
