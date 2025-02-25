import { useEffect } from 'react';
import PropTypes from 'prop-types';
import MovieList from '../components/MovieList';
import useMovieApi from '../hooks/useMovieApi';

function Home({ state, dispatch }) {
  const { getPopularMovies } = useMovieApi();

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch({ type: 'SET_LOADING' });
      try {
        const results = await getPopularMovies();
        dispatch({ type: 'SET_MOVIES', payload: results });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: `Error al cargar las películas: ${error.message}` });
      }
    };

    fetchMovies();
  }, [dispatch, getPopularMovies]);

  if (state.loading) {
    return <div className="loading">Cargando películas...</div>;
  }

  if (state.error) {
    return <div className="error">{state.error}</div>;
  }

  if (!state.movies || state.movies.length === 0) {
    return <div className="no-results">No hay películas disponibles</div>;
  }

  return <MovieList movies={state.movies} />;
}

Home.propTypes = {
  state: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    movies: PropTypes.array
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Home;
