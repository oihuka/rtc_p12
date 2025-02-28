import { useState } from 'react';
import { FaHome, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Navbar.css';

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    setShowSearch(false);
  };

  const handleReset = () => {
    navigate('/');
    setShowSearch(false);
    setSearchTerm('');
  };

  return (
    <nav className="navbar">
      <section className="nav-content">
        <header className="nav-brand">
          <h1 className="nav-logo" onClick={handleReset}>MovieApp</h1>
        </header>
        <section className="nav-actions">
          <FaHome 
            className="nav-icon" 
            onClick={handleReset}
            title="Inicio"
          />
          <section className="search-container">
            <FaSearch 
              className={`nav-icon ${showSearch ? 'active' : ''}`}
              onClick={() => setShowSearch(!showSearch)}
              title="Buscar"
            />
            <aside className={`search-dropdown ${showSearch ? 'show' : ''}`}>
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
            </aside>
          </section>
        </section>
      </section>
    </nav>
  );
}

export default Navbar;
