import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/pages/MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=` + import.meta.env.VITE_TMDB_API_KEY + `&language=es-ES`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar la película:', error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <LoadingSpinner message="Cargando detalles de la película..." />;
  if (!movie) return <section className="error">No se pudo cargar la película</section>;

  return (
    <article className="movie-detail-container">
      <section className="movie-detail-content">
        {movie.poster_path && (
          <figure className="movie-detail-poster">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="responsive-image"
            />
          </figure>
        )}
        <section className="movie-detail-info">
          <header>
            <h1>{movie.title}</h1>
            <div className="movie-meta">
              <time>{movie.release_date.split('-')[0]}</time>
              <span className="rating">
                <FaStar className="star-icon" /> {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </header>
          <p className="overview">{movie.overview}</p>
          <footer className="additional-info">
            <p><strong>Género:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
            <p><strong>Duración:</strong> {movie.runtime} minutos</p>
          </footer>
        </section>
      </section>
    </article>
  );
}

export default MovieDetail;
