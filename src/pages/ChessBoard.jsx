import { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-dom-confetti';
import Board from '../components/Board';
import PieceSelector from '../components/PieceSelector';
import MovesList from '../components/MovesList';
import GameControls from '../components/GameControls';
import { gameReducer, initialState } from '../reducers/gameReducer';
import { useChessGame } from '../hooks/useChessGame';
import '../styles/ChessBoard.css';

function ChessBoard() {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [showHints, setShowHints] = useState(true);
  const [promotionPending, setPromotionPending] = useState(null);
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [confettiActive, setConfettiActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Configuración del confeti
  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 200,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };
  
  const { 
    calculatePossibleMoves, 
    computerMove,
    isCheck,
    isCheckmate,
    isStalemate
  } = useChessGame(gameState, dispatch);

  // Efecto para el movimiento del ordenador
  useEffect(() => {
    if (gameState.currentPlayer === 'black' && !gameState.gameOver && !isPaused) {
      const timer = setTimeout(() => {
        computerMove();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState, computerMove, isPaused]);

  // Efecto para activar el confeti cuando el jugador gana
  useEffect(() => {
    if (gameState.gameOver && gameState.currentPlayer === 'black') {
      // El jugador (blancas) ha ganado
      setConfettiActive(true);
      
      // Desactivar el confeti después de un tiempo
      const timer = setTimeout(() => {
        setConfettiActive(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.gameOver, gameState.currentPlayer]);

  // Maneja la selección de una pieza o casilla
  const handlePieceSelect = (row, col) => {
    // Limpiar casillas destacadas
    setHighlightedSquares([]);
    
    // Si hay una promoción pendiente, no permitir seleccionar piezas
    if (promotionPending) return;
    
    const piece = gameState.board[row][col];
    const position = { row, col };
    
    // Solo permitir seleccionar piezas del jugador actual
    if (piece && piece.color === gameState.currentPlayer) {
      setSelectedPiece({ piece, position });
      const moves = calculatePossibleMoves(piece, position);
      setPossibleMoves(moves);
    } else if (selectedPiece && possibleMoves.some(move => 
      move.to.row === row && move.to.col === col)) {
      // Si ya hay una pieza seleccionada y se hace clic en un movimiento válido
      
      // Verificar si es un movimiento de promoción de peón
      const isPawnPromotion = 
        selectedPiece.piece.type === 'pawn' && 
        ((selectedPiece.piece.color === 'white' && row === 0) || 
         (selectedPiece.piece.color === 'black' && row === 7));
      
      if (isPawnPromotion) {
        // Guardar la información de promoción pendiente
        setPromotionPending({
          from: selectedPiece.position,
          to: position,
          color: selectedPiece.piece.color
        });
      } else {
        // Obtener el objeto de movimiento completo desde los movimientos posibles
        const move = possibleMoves.find(m => 
          m.to.row === row && m.to.col === col
        );
        
        if (move) {
          // Realizar el movimiento
          dispatch({
            type: 'MOVE_PIECE',
            payload: {
              from: selectedPiece.position,
              to: position,
              piece: selectedPiece.piece
            }
          });
          
          // Limpiar la selección y los movimientos posibles
          setSelectedPiece(null);
          setPossibleMoves([]);
        }
      }
    } else {
      // Si se hace clic en una casilla vacía o en una pieza del oponente sin tener una pieza seleccionada
      setSelectedPiece(null);
      setPossibleMoves([]);
    }
  };

  // Manejar la selección de pieza para promoción
  const handlePromotion = (pieceType) => {
    if (!promotionPending) return;
    
    // Despachar la acción para promocionar el peón
    dispatch({
      type: 'PROMOTE_PAWN',
      payload: {
        from: promotionPending.from,
        to: promotionPending.to,
        newType: pieceType
      }
    });
    
    // Cambiar el turno después de la promoción
    dispatch({
      type: 'CHANGE_TURN'
    });
    
    // Limpiar el estado de promoción
    setPromotionPending(null);
    setSelectedPiece(null);
    setPossibleMoves([]);
  };

  // Reiniciar el juego
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
    setSelectedPiece(null);
    setPossibleMoves([]);
    setPromotionPending(null);
    setHighlightedSquares([]);
    setConfettiActive(false);
  };

  // Deshacer el último movimiento
  const undoMove = () => {
    dispatch({ type: 'UNDO_MOVE' });
    setSelectedPiece(null);
    setPossibleMoves([]);
    setHighlightedSquares([]);
  };

  // Rehacer el último movimiento deshecho
  const redoMove = () => {
    dispatch({ type: 'REDO_MOVE' });
    setSelectedPiece(null);
    setPossibleMoves([]);
    setHighlightedSquares([]);
  };

  // Mostrar mensaje de estado del juego
  const getGameStatus = () => {
    if (gameState.gameOver) {
      if (isCheckmate()) {
        return `Jaque mate. ${gameState.currentPlayer === 'white' ? 'Negras' : 'Blancas'} ganan.`;
      } else if (isStalemate()) {
        return "Tablas por rey ahogado.";
      }
      return "Juego terminado.";
    } else if (isCheck()) {
      return `${gameState.currentPlayer === 'white' ? 'Rey blanco' : 'Rey negro'} en jaque.`;
    }
    return `Turno de las ${gameState.currentPlayer === 'white' ? 'blancas' : 'negras'}.`;
  };

  // Función para detener/reanudar el juego
  const togglePause = () => {
    setIsPaused(prevState => !prevState);
  };

  return (
    <main className="chess-page">
      <div className="confetti-container">
        <Confetti active={confettiActive} config={confettiConfig} />
      </div>
      
      <header className="game-header">
        <div className="scoreboard">
          <div className="player-score">
            <span className="player">Jugador</span>
            <span className="score">{gameState.scores.white}</span>
          </div>
          <div className="player-score">
            <span className="player">Computadora</span>
            <span className="score">{gameState.scores.black}</span>
          </div>
        </div>
        
        <div className="game-options">
          <div className="game-status">
            <div className="status-message" aria-live="polite">
              {getGameStatus()}
            </div>
          </div>
          <label className="hint-toggle">
            <input 
              type="checkbox" 
              checked={showHints} 
              onChange={() => setShowHints(!showHints)} 
            />
            <span>Mostrar ayudas</span>
          </label>
        </div>
      </header>
      
      <div className="game-layout">
        <section className="board-section" aria-label="Tablero de ajedrez">
          <Board 
            board={gameState.board} 
            selectedPiece={selectedPiece}
            possibleMoves={possibleMoves}
            highlightedSquares={highlightedSquares}
            onPieceSelect={handlePieceSelect}
            showHints={showHints}
          />
          
          {/* Selector de promoción de peón */}
          {promotionPending && (
            <PieceSelector 
              color={promotionPending.color} 
              onSelect={handlePromotion} 
            />
          )}
        </section>
        
        <aside className="game-sidebar">
          <section className="moves-section" aria-labelledby="moves-heading">
            <h2 id="moves-heading" className="section-title">Historial de movimientos</h2>
            <MovesList moves={gameState.moveHistory} />
          </section>
          
          {selectedPiece && (
            <div className="piece-info">
              <h3>Pieza seleccionada: {selectedPiece.piece.type}</h3>
              <p>Movimientos posibles: {possibleMoves.length}</p>
              <Link to={`/learn/${selectedPiece.piece.type.toLowerCase()}`} className="learn-link">
                Aprender sobre esta pieza
              </Link>
            </div>
          )}
          
          <section className="controls-section" aria-labelledby="controls-heading">
            <h2 id="controls-heading" className="section-title">Controles</h2>
            <GameControls 
              onReset={resetGame} 
              onUndo={undoMove}
              onRedo={redoMove}
              canUndo={gameState.moveHistory.length > 0}
              canRedo={gameState.redoStack.length > 0}
              onTogglePause={togglePause}
              isPaused={isPaused}
            />
          </section>
        </aside>
      </div>
      
      {isPaused && (
        <div className="pause-overlay">
          <div className="pause-message">
            <h2>Juego en pausa</h2>
            <p>Puedes consultar lecciones o estrategias mientras el juego está detenido.</p>
            <button 
              className="resume-button"
              onClick={togglePause}
              aria-label="Reanudar partida"
            >
              Reanudar partida
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default ChessBoard; 