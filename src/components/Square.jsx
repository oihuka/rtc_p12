import { memo } from 'react';
import PropTypes from 'prop-types';
import ChessPiece from './ChessPiece';
import '../styles/Square.css';

const Square = memo(function Square({ isLight, piece, row, col, isSelected, isValidMove, highlightType, showHint, onSelect }) {
  // Determinar las clases CSS para la casilla
  const squareClasses = [
    'chess-square',
    isLight ? 'light-square' : 'dark-square',
    isSelected ? 'selected' : '',
    isValidMove ? 'valid-move' : '',
    highlightType ? `highlight-${highlightType}` : ''
  ].filter(Boolean).join(' ');

  // Obtener la notación algebraica de la casilla (e.g., "e4")
  const getSquareNotation = () => {
    const file = String.fromCharCode(97 + col); // a-h
    const rank = 8 - row; // 8-1
    return `${file}${rank}`;
  };

  // Determinar si la casilla contiene una pieza capturable
  const isCapturableSquare = isValidMove && piece;

  return (
    <div 
      className={squareClasses} 
      onClick={onSelect}
      role="gridcell"
      aria-label={`${getSquareNotation()}${piece ? `, ${piece.color} ${piece.type}` : ''}`}
      data-position={getSquareNotation()}
    >
      <div className="square-content">
        {piece && <ChessPiece piece={piece} />}
        
        {showHint && !piece && (
          <div 
            className="move-indicator" 
            aria-hidden="true" 
            title="Movimiento posible"
          />
        )}
        
        {showHint && isCapturableSquare && (
          <div 
            className="capture-indicator" 
            aria-hidden="true" 
            title="Captura posible"
          />
        )}
        
        {highlightType === 'source' && (
          <div 
            className="highlight-source-indicator" 
            aria-hidden="true" 
            title="Casilla de origen"
          />
        )}
        
        {highlightType === 'target' && (
          <div 
            className="highlight-target-indicator" 
            aria-hidden="true" 
            title="Casilla de destino"
          />
        )}
      </div>
    </div>
  );
});

Square.displayName = 'Square';

Square.propTypes = {
  isLight: PropTypes.bool.isRequired,
  piece: PropTypes.shape({
    type: PropTypes.string,
    color: PropTypes.string
  }),
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  isValidMove: PropTypes.bool,
  highlightType: PropTypes.string,
  showHint: PropTypes.bool,
  onSelect: PropTypes.func.isRequired
};

Square.defaultProps = {
  piece: null,
  isSelected: false,
  isValidMove: false,
  highlightType: null,
  showHint: false
};

export default Square;