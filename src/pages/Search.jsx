import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/pages/Search.css';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Realizar búsqueda cuando cambia el término de búsqueda en la URL
  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query) => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES&query=${query}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
    setIsSearching(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Actualizar la URL con el nuevo término de búsqueda
    setSearchParams({ query: searchTerm });
    performSearch(searchTerm);
  };

  return (
    <section className="search-page">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar películas..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      {isSearching ? (
        <LoadingSpinner message={`Buscando "${searchTerm}"...`} />
      ) : (
        searchResults.length > 0 ? (
          <MovieList movies={searchResults} useModal={true} />
        ) : (
          searchTerm && !isSearching && (
            <p className="no-results">No se encontraron resultados para "{searchTerm}"</p>
          )
        )
      )}
    </section>
  );
}

export default Search;
