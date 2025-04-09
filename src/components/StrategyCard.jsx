import { useState } from 'react';
import PropTypes from 'prop-types';
import MiniBoard from './MiniBoard';
import { FaChevronDown, FaChevronUp, FaChessBoard } from 'react-icons/fa';
import '../styles/StrategyCard.css';

function StrategyCard({ strategy }) {
  const [expanded, setExpanded] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  // Cambiar a la siguiente posición
  const nextPosition = () => {
    if (strategy.positions && currentPosition < strategy.positions.length - 1) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  // Cambiar a la posición anterior
  const prevPosition = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    }
  };

  return (
    <article className={`strategy-card ${expanded ? 'expanded' : ''}`}>
      <header 
        className="strategy-header" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="strategy-title">
          <h3>{strategy.name}</h3>
          <span className="strategy-category">{strategy.category}</span>
        </div>
        <div className="expand-icon">
          {expanded ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
        </div>
      </header>
      
      {expanded && (
        <div className="strategy-content">
          <div className="strategy-description">
            <p>{strategy.description}</p>
          </div>
          
          {strategy.positions && strategy.positions.length > 0 ? (
            <section className="strategy-positions">
              <h4>
                <FaChessBoard aria-hidden="true" className="position-icon" />
                Posiciones clave
              </h4>
              
              <div className="position-viewer">
                <div className="position-controls">
                  <button 
                    onClick={prevPosition} 
                    disabled={currentPosition === 0}
                    className="position-nav prev"
                    aria-label="Posición anterior"
                  >
                    &laquo;
                  </button>
                  <span className="position-counter">
                    {currentPosition + 1} / {strategy.positions.length}
                  </span>
                  <button 
                    onClick={nextPosition} 
                    disabled={currentPosition === strategy.positions.length - 1}
                    className="position-nav next"
                    aria-label="Siguiente posición"
                  >
                    &raquo;
                  </button>
                </div>
                
                <div className="position-board">
                  {strategy.positions[currentPosition].board ? (
                    <MiniBoard 
                      position={strategy.positions[currentPosition].board}
                      moves={strategy.positions[currentPosition].highlightSquares || []}
                    />
                  ) : (
                    <div className="board-placeholder">
                      <FaChessBoard aria-hidden="true" className="placeholder-icon" />
                      <p>No hay tablero disponible para esta posición</p>
                    </div>
                  )}
                </div>
                
                <p className="position-description">
                  {strategy.positions[currentPosition].description}
                </p>
              </div>
            </section>
          ) : (
            <div className="no-positions">
              <p>No hay posiciones disponibles para esta estrategia.</p>
            </div>
          )}
          
          {strategy.tips && strategy.tips.length > 0 && (
            <section className="strategy-tips">
              <h4>Consejos</h4>
              <ul className="tips-list">
                {strategy.tips.map((tip, index) => (
                  <li key={index} className="tip-item">{tip}</li>
                ))}
              </ul>
            </section>
          )}
          
          {strategy.advantages && (
            <div className="strategy-advantages">
              <h4>Ventajas</h4>
              <p>{strategy.advantages}</p>
            </div>
          )}
          
          {strategy.disadvantages && (
            <div className="strategy-disadvantages">
              <h4>Desventajas</h4>
              <p>{strategy.disadvantages}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

StrategyCard.propTypes = {
  strategy: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    positions: PropTypes.arrayOf(
      PropTypes.shape({
        board: PropTypes.array,
        highlightSquares: PropTypes.array,
        description: PropTypes.string
      })
    ),
    tips: PropTypes.arrayOf(PropTypes.string),
    advantages: PropTypes.string,
    disadvantages: PropTypes.string
  }).isRequired
};

export default StrategyCard; 