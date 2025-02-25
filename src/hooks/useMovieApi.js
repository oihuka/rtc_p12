import { useState, useCallback } from 'react';
import axios from 'axios';

const useMovieApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPopularMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`
      );
      return response.data.results;
    } catch (error) {
      setError(`Error al cargar las películas: ${error.message}`);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const searchMovies = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES&query=${query}`
      );
      return response.data.results;
    } catch (error) {
      setError(`Error en la búsqueda: ${error.message}`);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getMovieDetails = useCallback(async (movieId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`
      );
      return response.data;
    } catch (error) {
      setError(`Error al cargar los detalles de la película: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getPopularMovies,
    searchMovies,
    getMovieDetails
  };
};

export default useMovieApi;
