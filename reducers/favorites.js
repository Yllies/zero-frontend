// reducers.js
const initialState = {
    favorites: [], // Liste des articles favoris
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORITES':
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      case 'REMOVE_FROM_FAVORITES':
        return {
          ...state,
          favorites: state.favorites.filter((postId) => postId !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  