import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import '../styles/StrategyModal.css';

function StrategyModal({ strategy, onClose }) {
  // Prevenir que los clics dentro del modal se propaguen al fondo
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="strategy-modal" onClick={handleModalClick}>
        <div className="modal-header">
          <h3>{strategy.name}</h3>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="strategy-description">
            <p>{strategy.description}</p>
          </div>
          
          <div className="strategy-progress">
            <h4>Tu progreso</h4>
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${strategy.progress}%` }}
              ></div>
              <span className="progress-text">{strategy.progress}%</span>
            </div>
          </div>
          
          <div className="strategy-tips">
            <h4>Consejos para aplicar esta estrategia</h4>
            <ul>
              {strategy.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          
          <div className="strategy-actions">
            <button className="action-button" onClick={onClose}>
              Aplicar en mi juego
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

StrategyModal.propTypes = {
  strategy: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tips: PropTypes.arrayOf(PropTypes.string).isRequired,
    progress: PropTypes.number.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default StrategyModal; 