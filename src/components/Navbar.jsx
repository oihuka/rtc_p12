import { useState } from 'react';
import { FaHome, FaChessKnight, FaChessBoard, FaBook } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleReset = () => {
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-brand">
          <FaChessKnight className="logo-icon" />
          <h1 className="nav-logo" onClick={handleReset}>Chess Master</h1>
        </div>
        
        <div className="nav-toggle" onClick={toggleMenu}>
          <span className={`toggle-bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`toggle-bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`toggle-bar ${menuOpen ? 'open' : ''}`}></span>
        </div>
        
        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className="nav-item" 
            onClick={() => setMenuOpen(false)}
          >
            <FaHome className="nav-icon" />
            <span>Inicio</span>
          </Link>
          
          <Link 
            to="/play" 
            className="nav-item" 
            onClick={() => setMenuOpen(false)}
          >
            <FaChessBoard className="nav-icon" />
            <span>Jugar</span>
          </Link>
          
          <Link 
            to="/learn/pawn" 
            className="nav-item" 
            onClick={() => setMenuOpen(false)}
          >
            <FaBook className="nav-icon" />
            <span>Aprender</span>
          </Link>
          
          <Link 
            to="/strategies" 
            className="nav-item" 
            onClick={() => setMenuOpen(false)}
          >
            <FaChessKnight className="nav-icon" />
            <span>Estrategias</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
