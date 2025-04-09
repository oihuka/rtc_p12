import PropTypes from 'prop-types';
import '../styles/PieceSelector.css';

function PieceSelector({ color, onSelect }) {
  const pieces = ['queen', 'rook', 'bishop', 'knight'];
  
  // Obtener la URL de la imagen de la pieza
  const getPieceImage = (pieceType) => {
    // Mapeo de tipos de piezas al formato de Lichess
    const typeMap = {
      queen: 'Q',
      rook: 'R',
      bishop: 'B',
      knight: 'N'
    };
    
    // Mapeo de colores al formato de Lichess
    const colorPrefix = color === 'white' ? 'w' : 'b';
    const pieceCode = typeMap[pieceType] || 'Q';
    
    // URL base para las piezas de Lichess Fantasy
    return `https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/fantasy/${colorPrefix}${pieceCode}.svg`;
  };
  
  // Traducir el nombre de la pieza al español
  const getPieceName = (pieceType) => {
    const pieceNames = {
      queen: 'dama',
      rook: 'torre',
      bishop: 'alfil',
      knight: 'caballo'
    };
    
    return pieceNames[pieceType] || pieceType;
  };
  
  return (
    <div className="piece-selector">
      <h3>Selecciona una pieza para promocionar</h3>
      <div className="pieces-container">
        {pieces.map(piece => (
          <div 
            key={piece} 
            className="piece-option"
            onClick={() => onSelect(piece)}
            role="button"
            aria-label={`Promocionar a ${getPieceName(piece)}`}
          >
            <img 
              src={getPieceImage(piece)} 
              alt={getPieceName(piece)}
              title={`Promocionar a ${getPieceName(piece)}`}
              className="promotion-piece-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

PieceSelector.propTypes = {
  color: PropTypes.oneOf(['white', 'black']).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default PieceSelector; 