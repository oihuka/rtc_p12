import { memo } from 'react';
import PropTypes from 'prop-types';
import LazyImage from './LazyImage';

const MovieCard = memo(function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <LazyImage 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title}
        className="movie-poster"
      />
    </div>
  );
});

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default MovieCard;
