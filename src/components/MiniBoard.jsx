import { memo } from 'react';
import PropTypes from 'prop-types';
import '../styles/MiniBoard.css';

const MiniBoard = memo(function MiniBoard({ position, moves }) {
  // Obtener la URL de la imagen de la pieza
  const getPieceImage = (piece) => {
    const { type, color } = piece;
    
    // Mapeo de tipos de piezas al formato de Lichess
    const typeMap = {
      pawn: 'P',
      knight: 'N',
      bishop: 'B',
      rook: 'R',
      queen: 'Q',
      king: 'K'
    };
    
    // Mapeo de colores al formato de Lichess
    const colorPrefix = color === 'white' ? 'w' : 'b';
    const pieceType = typeMap[type.toLowerCase()] || 'P';
    
    // URL base para las piezas de Lichess Fantasy
    return `https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/fantasy/${colorPrefix}${pieceType}.svg`;
  };

  // Renderizar una casilla del tablero
  const renderSquare = (row, col) => {
    const isLight = (row + col) % 2 === 0;
    const piece = position[row][col];
    
    // Verificar si esta casilla es un movimiento posible
    const isMove = moves.some(move => 
      move.row === row && move.col === col
    );
    
    // Clases CSS para la casilla
    const squareClasses = [
      'mini-square',
      isLight ? 'light-square' : 'dark-square',
      isMove ? 'possible-move' : ''
    ].filter(Boolean).join(' ');
    
    // Obtener la notación algebraica de la casilla
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const squarePosition = `${files[col]}${ranks[row]}`;
    
    return (
      <div 
        key={`${row}-${col}`} 
        className={squareClasses}
        data-position={squarePosition}
        aria-label={piece ? `${piece.color} ${piece.type} en ${squarePosition}` : `Casilla ${squarePosition}`}
      >
        {piece && (
          <img 
            src={getPieceImage(piece)}
            alt={`${piece.color} ${piece.type}`}
            className="mini-piece"
            loading="lazy"
            draggable="false"
          />
        )}
        {isMove && <div className="move-dot" aria-hidden="true" />}
      </div>
    );
  };

  // Renderizar el tablero completo
  const renderBoard = () => {
    const rows = [];
    
    for (let row = 0; row < 8; row++) {
      const squares = [];
      
      for (let col = 0; col < 8; col++) {
        squares.push(renderSquare(row, col));
      }
      
      rows.push(
        <div key={row} className="mini-board-row" role="row">
          {squares}
        </div>
      );
    }
    
    return rows;
  };

  return (
    <div className="mini-board" role="grid" aria-label="Tablero de ajedrez en miniatura">
      {renderBoard()}
    </div>
  );
});

MiniBoard.displayName = 'MiniBoard';

MiniBoard.propTypes = {
  position: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        color: PropTypes.string
      })
    )
  ).isRequired,
  moves: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.number.isRequired,
      col: PropTypes.number.isRequired
    })
  )
};

MiniBoard.defaultProps = {
  moves: []
};

export default MiniBoard; 