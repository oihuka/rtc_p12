import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaUndo, FaRedo, FaChessBoard, FaPause, FaPlay } from 'react-icons/fa';
import '../styles/GameControls.css';

function GameControls({ onReset, onUndo, onRedo, canUndo, canRedo, onTogglePause, isPaused }) {
  return (
    <section className="game-controls" aria-labelledby="controls-heading">
      <h3 id="controls-heading">Controles</h3>
      <div className="controls-container">
        <button 
          className="control-button undo" 
          onClick={onUndo} 
          disabled={!canUndo}
          title="Deshacer movimiento"
          aria-label="Deshacer movimiento"
        >
          <FaUndo aria-hidden="true" />
          <span>Deshacer</span>
        </button>
        
        <button 
          className="control-button redo" 
          onClick={onRedo} 
          disabled={!canRedo}
          title="Rehacer movimiento"
          aria-label="Rehacer movimiento"
        >
          <FaRedo aria-hidden="true" />
          <span>Rehacer</span>
        </button>
        
        <button 
          className="control-button reset" 
          onClick={onReset}
          title="Reiniciar partida"
          aria-label="Reiniciar partida"
        >
          <FaChessBoard aria-hidden="true" />
          <span>Reiniciar</span>
        </button>

        <button 
          className={`control-button pause ${isPaused ? 'active' : ''}`}
          onClick={onTogglePause}
          title={isPaused ? "Reanudar partida" : "Detener partida"}
          aria-label={isPaused ? "Reanudar partida" : "Detener partida"}
        >
          {isPaused ? (
            <>
              <FaPlay aria-hidden="true" />
              <span>Reanudar</span>
            </>
          ) : (
            <>
              <FaPause aria-hidden="true" />
              <span>Detener</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}

GameControls.propTypes = {
  onReset: PropTypes.func.isRequired,
  onUndo: PropTypes.func,
  onRedo: PropTypes.func,
  canUndo: PropTypes.bool,
  canRedo: PropTypes.bool,
  onTogglePause: PropTypes.func,
  isPaused: PropTypes.bool
};

GameControls.defaultProps = {
  onUndo: () => {},
  onRedo: () => {},
  canUndo: false,
  canRedo: false,
  onTogglePause: () => {},
  isPaused: false
};

export default GameControls; 