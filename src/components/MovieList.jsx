import { Fragment, useState } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import '../styles/components/MovieList.css';

function MovieList({ movies, useModal = true }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = async (movie) => {
    if (useModal) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`
        );
        const fullMovieData = await response.json();
        setSelectedMovie(fullMovieData);
      } catch (error) {
        console.error('Error al cargar los detalles de la película:', error);
      }
    }
  };

  return (
    <Fragment>
      <section className="movie-grid">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={useModal ? handleMovieClick : null}
          />
        ))}
      </section>
      {selectedMovie && useModal && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </Fragment>
  );
}

export default MovieList;
