import { Link } from 'react-router-dom';
import '../styles/components/MovieCard.css';

function MovieCard({ movie, onClick }) {
  const handleClick = (e) => {
    // Si hay una función onClick proporcionada (para el modal), 
    // la ejecutamos pero NO prevenimos la navegación por defecto
    if (onClick) {
      onClick(movie);
      
      // Prevenimos la navegación por defecto SOLO si estamos en modo modal
      // Esto permite que el enlace funcione normalmente cuando no se usa el modal
      e.preventDefault();
    }
  };

  return (
    <article className="movie-card">
      <Link 
        to={`/movie/${movie.id}`} 
        className="movie-card-link"
        onClick={handleClick}
      >
        {movie.poster_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
        ) : (
          <div className="movie-poster-placeholder">
            <span className="movie-title">{movie.title}</span>
          </div>
        )}
      </Link>
    </article>
  );
}

export default MovieCard;
