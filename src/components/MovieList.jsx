import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

function MovieList({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=83ec59640d4c10237655793a5eecaeb1&language=es-ES`
      );
      const fullMovieData = await response.json();
      setSelectedMovie(fullMovieData);
    } catch (error) {
      console.error('Error al cargar los detalles de la película:', error);
    }
  };

  return (
    <Fragment>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={handleMovieClick}
          />
        ))}
      </div>
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </Fragment>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string
    })
  ).isRequired
};

export default MovieList;
