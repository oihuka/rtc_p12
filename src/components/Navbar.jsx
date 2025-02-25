import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaHome, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useMovieApi from '../hooks/useMovieApi';

function Navbar({ onSearchResults, onReset }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { searchMovies } = useMovieApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const results = await searchMovies(searchTerm);
    onSearchResults(results);
  };

  const handleReset = () => {
    navigate('/');
    setShowSearch(false);
    setSearchTerm('');
    onReset();
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-brand">
          <span className="nav-logo" onClick={handleReset}>MovieApp</span>
        </div>
        <div className="nav-actions">
          <FaHome 
            className="nav-icon" 
            onClick={handleReset}
            title="Inicio"
          />
          <div className="search-container">
            <FaSearch 
              className={`nav-icon ${showSearch ? 'active' : ''}`}
              onClick={() => setShowSearch(!showSearch)}
              title="Buscar"
            />
            <div className={`search-dropdown ${showSearch ? 'show' : ''}`}>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Títulos, personas, géneros"
                  autoFocus
                />
                <button type="submit">Buscar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onSearchResults: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default Navbar;
