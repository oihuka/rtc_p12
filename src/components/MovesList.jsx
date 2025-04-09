import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/MovesList.css';

function MovesList({ moves }) {
  const movesContainerRef = useRef(null);

  // Desplazar automáticamente hacia abajo cuando se añaden nuevos movimientos
  useEffect(() => {
    if (movesContainerRef.current) {
      movesContainerRef.current.scrollTop = movesContainerRef.current.scrollHeight;
    }
  }, [moves]);

  // Convertir coordenadas numéricas a notación algebraica
  const toAlgebraic = (position) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    
    return files[position.col] + ranks[position.row];
  };

  // Obtener la notación del movimiento
  const getMoveNotation = (move) => {
    const { piece, from, to, isCapture, isCheck, isCheckmate, isCastle, isPromotion, promotedTo } = move;
    
    let notation = '';
    
    // Castling
    if (isCastle) {
      return to.col > from.col ? 'O-O' : 'O-O-O';
    }
    
    // Piece symbol
    if (piece.type !== 'pawn') {
      switch (piece.type) {
        case 'knight':
          notation += 'N';
          break;
        case 'bishop':
          notation += 'B';
          break;
        case 'rook':
          notation += 'R';
          break;
        case 'queen':
          notation += 'Q';
          break;
        case 'king':
          notation += 'K';
          break;
        default:
          break;
      }
    }
    
    // Capture
    if (isCapture) {
      if (piece.type === 'pawn') {
        notation += toAlgebraic(from)[0]; // Add file for pawn captures
      }
      notation += 'x';
    }
    
    // Destination
    notation += toAlgebraic(to);
    
    // Promotion
    if (isPromotion && promotedTo) {
      notation += '=' + promotedTo.charAt(0).toUpperCase();
    }
    
    // Check or checkmate
    if (isCheckmate) {
      notation += '#';
    } else if (isCheck) {
      notation += '+';
    }
    
    return notation;
  };

  // Renderizar los movimientos en pares (blancas y negras)
  const renderMoves = () => {
    const moveRows = [];
    
    for (let i = 0; i < moves.length; i += 2) {
      const whiteMove = moves[i];
      const blackMove = i + 1 < moves.length ? moves[i + 1] : null;
      
      moveRows.push(
        <div key={i / 2} className="move-row">
          <div className="move-number">{Math.floor(i / 2) + 1}.</div>
          <div className="move white-move">{getMoveNotation(whiteMove)}</div>
          {blackMove && (
            <div className="move black-move">{getMoveNotation(blackMove)}</div>
          )}
        </div>
      );
    }
    
    return moveRows;
  };

  return (
    <div className="moves-list">
      <h3>Movimientos</h3>
      <div className="moves-container" ref={movesContainerRef}>
        {moves.length > 0 ? (
          renderMoves()
        ) : (
          <p className="no-moves">No hay movimientos registrados.</p>
        )}
      </div>
    </div>
  );
}

MovesList.propTypes = {
  moves: PropTypes.arrayOf(
    PropTypes.shape({
      piece: PropTypes.shape({
        type: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
      }).isRequired,
      from: PropTypes.shape({
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired
      }).isRequired,
      to: PropTypes.shape({
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired
      }).isRequired,
      isCapture: PropTypes.bool,
      isCheck: PropTypes.bool,
      isCheckmate: PropTypes.bool,
      isCastle: PropTypes.bool,
      isPromotion: PropTypes.bool,
      promotedTo: PropTypes.string
    })
  )
};

MovesList.defaultProps = {
  moves: []
};

export default MovesList; 