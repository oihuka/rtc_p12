import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useMovieApi from '../hooks/useMovieApi';

function MovieDetail({ state, dispatch }) {
  const { id } = useParams();
  const { getMovieDetails } = useMovieApi();

  useEffect(() => {
    const fetchMovie = async () => {
      dispatch({ type: 'SET_LOADING' });
      try {
        const movieData = await getMovieDetails(id);
        dispatch({ type: 'SET_SELECTED_MOVIE', payload: movieData });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: `Error al cargar los detalles de la película: ${error.message}` });
      }
    };

    fetchMovie();
  }, [id, dispatch, getMovieDetails]);

  if (state.loading) return <div className="loading">Cargando...</div>;
  if (state.error) return <div className="error">{state.error}</div>;
  if (!state.selectedMovie) return <div className="error">No se pudo cargar la película</div>;

  const movie = state.selectedMovie;

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-content">
        <div className="movie-detail-poster">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
          />
        </div>
        <div className="movie-detail-info">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span className="release-date">{movie.release_date.split('-')[0]}</span>
            <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
          </div>
          <p className="overview">{movie.overview}</p>
          <div className="additional-info">
            <p><strong>Género:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
            <p><strong>Duración:</strong> {movie.runtime} minutos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

MovieDetail.propTypes = {
  state: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    selectedMovie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
      runtime: PropTypes.number,
      overview: PropTypes.string,
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        })
      )
    })
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default MovieDetail;
