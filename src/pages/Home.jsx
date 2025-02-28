import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/pages/Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=' + import.meta.env.VITE_TMDB_API_KEY + '&language=es-ES'
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las películas');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <LoadingSpinner message="Cargando películas populares..." />;
  if (error) return <section className="error">{error}</section>;

  return (
    <section className="home-container">
      <MovieList movies={movies} useModal={true} />
    </section>
  );
}

export default Home;
