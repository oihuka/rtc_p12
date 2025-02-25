export const initialState = {
  movies: [],
  searchResults: null,
  selectedMovie: null,
  loading: false,
  error: null
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload,
        loading: false,
        error: null
      };
    case 'SET_SELECTED_MOVIE':
      return {
        ...state,
        selectedMovie: action.payload,
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'RESET_SEARCH':
      return {
        ...state,
        searchResults: null,
        error: null
      };
    default:
      return state;
  }
};
