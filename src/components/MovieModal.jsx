import { FaTimes, FaStar, FaArrowLeft } from 'react-icons/fa';
import '../styles/components/MovieModal.css';

function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <aside className="movie-modal-overlay" onClick={onClose}>
      <article className="movie-modal-content" onClick={e => e.stopPropagation()}>
        <header className="movie-modal-header">
          <button className="back-button" onClick={onClose}>
            <FaArrowLeft />
          </button>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </header>
        
        <section className="movie-modal-body">
          {movie.poster_path && (
            <figure className="movie-modal-poster">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="responsive-image"
              />
            </figure>
          )}
          
          <section className="movie-modal-info">
            <h2>{movie.title}</h2>
            <div className="movie-meta">
              <time className="year">{movie.release_date?.split('-')[0]}</time>
              <span className="rating">
                <FaStar className="star-icon" /> {movie.vote_average?.toFixed(1)}
              </span>
              <span className="runtime">{movie.runtime} min</span>
            </div>
            
            <div className="movie-genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>

            <section className="movie-overview">
              <h3>Sinopsis</h3>
              <p>{movie.overview}</p>
            </section>

            {movie.production_companies?.length > 0 && (
              <section className="movie-companies">
                <h3>Productoras</h3>
                <p>{movie.production_companies.map(company => company.name).join(', ')}</p>
              </section>
            )}

            {movie.release_date && (
              <section className="movie-release">
                <h3>Fecha de estreno</h3>
                <p>
                  <time dateTime={movie.release_date}>
                    {new Date(movie.release_date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </p>
              </section>
            )}
          </section>
        </section>
      </article>
    </aside>
  );
}

export default MovieModal;
