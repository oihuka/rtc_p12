import { useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=` + import.meta.env.VITE_TMDB_API_KEY + `&language=es-ES&query=${searchTerm}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
    setIsSearching(false);
  };

  return (
    <div className="search-page">
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
        <div>Buscando...</div>
      ) : (
        searchResults.length > 0 && <MovieList movies={searchResults} />
      )}
    </div>
  );
}

export default Search;
