import { memo } from 'react';
import PropTypes from 'prop-types';
import '../styles/ChessPiece.css';

const ChessPiece = memo(function ChessPiece({ piece }) {
  // Obtener la URL de la imagen de la pieza
  const getPieceImage = () => {
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

  // Obtener el nombre completo de la pieza para accesibilidad
  const getPieceName = () => {
    const { type, color } = piece;
    const colorName = color === 'white' ? 'blanca' : 'negra';
    
    // Mapeo de tipos de piezas a nombres en español
    const typeNames = {
      pawn: 'peón',
      knight: 'caballo',
      bishop: 'alfil',
      rook: 'torre',
      queen: 'dama',
      king: 'rey'
    };
    
    const typeName = typeNames[type.toLowerCase()] || type;
    return `${typeName} ${colorName}`;
  };

  return (
    <div 
      className="chess-piece" 
      role="img" 
      aria-label={getPieceName()} 
      data-color={piece.color}
    >
      <img 
        src={getPieceImage()} 
        alt={getPieceName()} 
        className="piece-image"
        draggable="false"
      />
    </div>
  );
});

ChessPiece.displayName = 'ChessPiece';

ChessPiece.propTypes = {
  piece: PropTypes.shape({
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired
};

export default ChessPiece; 