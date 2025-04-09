// Configuración inicial del tablero
const createInitialBoard = () => {
  // Crear un tablero vacío de 8x8
  const board = Array(8).fill().map(() => Array(8).fill(null));
  
  // Colocar peones
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black' };
    board[6][col] = { type: 'pawn', color: 'white' };
  }
  
  // Colocar torres
  board[0][0] = { type: 'rook', color: 'black' };
  board[0][7] = { type: 'rook', color: 'black' };
  board[7][0] = { type: 'rook', color: 'white' };
  board[7][7] = { type: 'rook', color: 'white' };
  
  // Colocar caballos
  board[0][1] = { type: 'knight', color: 'black' };
  board[0][6] = { type: 'knight', color: 'black' };
  board[7][1] = { type: 'knight', color: 'white' };
  board[7][6] = { type: 'knight', color: 'white' };
  
  // Colocar alfiles
  board[0][2] = { type: 'bishop', color: 'black' };
  board[0][5] = { type: 'bishop', color: 'black' };
  board[7][2] = { type: 'bishop', color: 'white' };
  board[7][5] = { type: 'bishop', color: 'white' };
  
  // Colocar reinas
  board[0][3] = { type: 'queen', color: 'black' };
  board[7][3] = { type: 'queen', color: 'white' };
  
  // Colocar reyes
  board[0][4] = { type: 'king', color: 'black' };
  board[7][4] = { type: 'king', color: 'white' };
  
  return board;
};

// Estado inicial del juego
export const initialState = {
  board: createInitialBoard(),
  currentPlayer: 'white', // El jugador blanco comienza
  moveHistory: [],
  redoStack: [], // Para rehacer movimientos
  capturedPieces: {
    white: [],
    black: []
  },
  gameOver: false,
  check: false,
  scores: {
    white: 0,
    black: 0
  },
  // Estado para el enroque
  castling: {
    whiteKingMoved: false,
    blackKingMoved: false,
    whiteRookAMoved: false,
    whiteRookHMoved: false,
    blackRookAMoved: false,
    blackRookHMoved: false
  },
  // Estado para la captura al paso
  enPassant: {
    available: false,
    position: null
  }
};

// Función para verificar si un rey ha sido capturado
const isKingCaptured = (board, color) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === 'king' && piece.color === color) {
        return false;
      }
    }
  }
  return true;
};

// Reducer para el juego de ajedrez
export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'MOVE_PIECE': {
      const { from, to, piece } = action.payload;
      const newBoard = [...state.board.map(row => [...row])];
      const capturedPiece = newBoard[to.row][to.col];
      
      // Actualizar el tablero con el movimiento
      newBoard[to.row][to.col] = piece;
      newBoard[from.row][from.col] = null;
      
      // Registrar el movimiento en el historial
      const moveData = {
        piece,
        from,
        to,
        isCapture: !!capturedPiece,
        capturedPiece,
        timestamp: new Date().toISOString()
      };
      
      // Actualizar piezas capturadas
      const newCapturedPieces = { ...state.capturedPieces };
      if (capturedPiece) {
        const captureColor = piece.color === 'white' ? 'black' : 'white';
        newCapturedPieces[captureColor] = [
          ...newCapturedPieces[captureColor],
          capturedPiece
        ];
      }
      
      // Verificar si un rey ha sido capturado
      const opponentColor = piece.color === 'white' ? 'black' : 'white';
      const kingCaptured = capturedPiece && capturedPiece.type === 'king';
      
      // Si un rey ha sido capturado, el juego termina
      if (kingCaptured) {
        // Actualizar puntuación
        const newScores = { ...state.scores };
        newScores[piece.color] += 1;
        
        return {
          ...state,
          board: newBoard,
          moveHistory: [...state.moveHistory, moveData],
          capturedPieces: newCapturedPieces,
          gameOver: true,
          scores: newScores,
          redoStack: [] // Limpiar la pila de rehacer
        };
      }
      
      // Cambiar el turno
      const nextPlayer = state.currentPlayer === 'white' ? 'black' : 'white';
      
      return {
        ...state,
        board: newBoard,
        currentPlayer: nextPlayer,
        moveHistory: [...state.moveHistory, moveData],
        capturedPieces: newCapturedPieces,
        redoStack: [] // Limpiar la pila de rehacer al hacer un nuevo movimiento
      };
    }
    
    case 'PROMOTE_PAWN': {
      const { from, to, newType } = action.payload;
      const newBoard = [...state.board.map(row => [...row])];
      const pawn = newBoard[from.row][from.col];
      const capturedPiece = newBoard[to.row][to.col];
      
      // Crear la nueva pieza promocionada
      const promotedPiece = {
        type: newType,
        color: pawn.color
      };
      
      // Actualizar el tablero
      newBoard[to.row][to.col] = promotedPiece;
      newBoard[from.row][from.col] = null;
      
      // Registrar el movimiento en el historial
      const moveData = {
        piece: pawn,
        from,
        to,
        isCapture: !!capturedPiece,
        capturedPiece,
        isPromotion: true,
        promotedTo: newType,
        timestamp: new Date().toISOString()
      };
      
      // Actualizar piezas capturadas
      const newCapturedPieces = { ...state.capturedPieces };
      if (capturedPiece) {
        const captureColor = pawn.color === 'white' ? 'black' : 'white';
        newCapturedPieces[captureColor] = [
          ...newCapturedPieces[captureColor],
          capturedPiece
        ];
      }
      
      return {
        ...state,
        board: newBoard,
        moveHistory: [...state.moveHistory, moveData],
        capturedPieces: newCapturedPieces,
        redoStack: [] // Limpiar la pila de rehacer
      };
    }
    
    case 'CHANGE_TURN': {
      return {
        ...state,
        currentPlayer: state.currentPlayer === 'white' ? 'black' : 'white'
      };
    }
    
    case 'SET_CHECK': {
      return {
        ...state,
        check: action.payload
      };
    }
    
    case 'SET_GAME_OVER': {
      // Actualizar puntuación si hay un ganador
      const newScores = { ...state.scores };
      if (action.payload.winner) {
        newScores[action.payload.winner] += 1;
      }
      
      return {
        ...state,
        gameOver: true,
        scores: newScores
      };
    }
    
    case 'RESET_GAME': {
      return {
        ...initialState,
        scores: state.scores // Mantener las puntuaciones
      };
    }
    
    case 'UNDO_MOVE': {
      // Si no hay movimientos para deshacer, no hacer nada
      if (state.moveHistory.length === 0) {
        return state;
      }
      
      // Obtener el último movimiento
      const lastMove = state.moveHistory[state.moveHistory.length - 1];
      const newBoard = [...state.board.map(row => [...row])];
      
      // Deshacer el movimiento
      if (lastMove.isPromotion) {
        // Si fue una promoción, volver a colocar el peón
        newBoard[lastMove.from.row][lastMove.from.col] = lastMove.piece;
      } else {
        // Movimiento normal
        newBoard[lastMove.from.row][lastMove.from.col] = lastMove.piece;
      }
      
      // Restaurar la pieza capturada si la hubo
      if (lastMove.isCapture) {
        newBoard[lastMove.to.row][lastMove.to.col] = lastMove.capturedPiece;
      } else {
        newBoard[lastMove.to.row][lastMove.to.col] = null;
      }
      
      // Actualizar piezas capturadas
      const newCapturedPieces = { ...state.capturedPieces };
      if (lastMove.isCapture) {
        const captureColor = lastMove.piece.color === 'white' ? 'black' : 'white';
        newCapturedPieces[captureColor] = newCapturedPieces[captureColor].slice(0, -1);
      }
      
      // Actualizar historial y pila de rehacer
      const newHistory = state.moveHistory.slice(0, -1);
      const newRedoStack = [...state.redoStack, lastMove];
      
      // Cambiar el turno
      const prevPlayer = state.currentPlayer === 'white' ? 'black' : 'white';
      
      return {
        ...state,
        board: newBoard,
        currentPlayer: prevPlayer,
        moveHistory: newHistory,
        redoStack: newRedoStack,
        capturedPieces: newCapturedPieces,
        gameOver: false // Deshacer puede revertir un jaque mate
      };
    }
    
    case 'REDO_MOVE': {
      // Si no hay movimientos para rehacer, no hacer nada
      if (state.redoStack.length === 0) {
        return state;
      }
      
      // Obtener el último movimiento deshecho
      const moveToRedo = state.redoStack[state.redoStack.length - 1];
      const newBoard = [...state.board.map(row => [...row])];
      
      // Rehacer el movimiento
      if (moveToRedo.isPromotion) {
        // Si fue una promoción, colocar la pieza promocionada
        const promotedPiece = {
          type: moveToRedo.promotedTo,
          color: moveToRedo.piece.color
        };
        newBoard[moveToRedo.to.row][moveToRedo.to.col] = promotedPiece;
      } else {
        // Movimiento normal
        newBoard[moveToRedo.to.row][moveToRedo.to.col] = moveToRedo.piece;
      }
      
      // Quitar la pieza de su posición original
      newBoard[moveToRedo.from.row][moveToRedo.from.col] = null;
      
      // Actualizar piezas capturadas
      const newCapturedPieces = { ...state.capturedPieces };
      if (moveToRedo.isCapture) {
        const captureColor = moveToRedo.piece.color === 'white' ? 'black' : 'white';
        newCapturedPieces[captureColor] = [
          ...newCapturedPieces[captureColor],
          moveToRedo.capturedPiece
        ];
      }
      
      // Actualizar historial y pila de rehacer
      const newHistory = [...state.moveHistory, moveToRedo];
      const newRedoStack = state.redoStack.slice(0, -1);
      
      // Cambiar el turno
      const nextPlayer = state.currentPlayer === 'white' ? 'black' : 'white';
      
      // Verificar si un rey ha sido capturado
      const kingCaptured = moveToRedo.isCapture && moveToRedo.capturedPiece.type === 'king';
      
      return {
        ...state,
        board: newBoard,
        currentPlayer: nextPlayer,
        moveHistory: newHistory,
        redoStack: newRedoStack,
        capturedPieces: newCapturedPieces,
        gameOver: kingCaptured // Si se capturó un rey, el juego termina
      };
    }
    
    case 'CASTLE': {
      const { kingFrom, kingTo, rookFrom, rookTo } = action.payload;
      const newBoard = [...state.board.map(row => [...row])];
      
      // Mover el rey
      const king = newBoard[kingFrom.row][kingFrom.col];
      newBoard[kingTo.row][kingTo.col] = king;
      newBoard[kingFrom.row][kingFrom.col] = null;
      
      // Mover la torre
      const rook = newBoard[rookFrom.row][rookFrom.col];
      newBoard[rookTo.row][rookTo.col] = rook;
      newBoard[rookFrom.row][rookFrom.col] = null;
      
      // Actualizar estado de enroque
      const newCastling = { ...state.castling };
      if (king.color === 'white') {
        newCastling.whiteKingMoved = true;
      } else {
        newCastling.blackKingMoved = true;
      }
      
      // Registrar el movimiento en el historial
      const moveData = {
        piece: king,
        from: kingFrom,
        to: kingTo,
        isCastle: true,
        castleSide: kingTo.col > kingFrom.col ? 'kingside' : 'queenside',
        timestamp: new Date().toISOString()
      };
      
      // Cambiar el turno
      const nextPlayer = state.currentPlayer === 'white' ? 'black' : 'white';
      
      return {
        ...state,
        board: newBoard,
        currentPlayer: nextPlayer,
        moveHistory: [...state.moveHistory, moveData],
        castling: newCastling,
        redoStack: [] // Limpiar la pila de rehacer
      };
    }
    
    case 'EN_PASSANT_CAPTURE': {
      const { from, to, capturePosition } = action.payload;
      const newBoard = [...state.board.map(row => [...row])];
      
      // Mover el peón
      const pawn = newBoard[from.row][from.col];
      newBoard[to.row][to.col] = pawn;
      newBoard[from.row][from.col] = null;
      
      // Capturar el peón enemigo
      const capturedPawn = newBoard[capturePosition.row][capturePosition.col];
      newBoard[capturePosition.row][capturePosition.col] = null;
      
      // Actualizar piezas capturadas
      const newCapturedPieces = { ...state.capturedPieces };
      const captureColor = pawn.color === 'white' ? 'black' : 'white';
      newCapturedPieces[captureColor] = [
        ...newCapturedPieces[captureColor],
        capturedPawn
      ];
      
      // Registrar el movimiento en el historial
      const moveData = {
        piece: pawn,
        from,
        to,
        isCapture: true,
        isEnPassant: true,
        capturedPiece: capturedPawn,
        capturePosition,
        timestamp: new Date().toISOString()
      };
      
      // Cambiar el turno
      const nextPlayer = state.currentPlayer === 'white' ? 'black' : 'white';
      
      return {
        ...state,
        board: newBoard,
        currentPlayer: nextPlayer,
        moveHistory: [...state.moveHistory, moveData],
        capturedPieces: newCapturedPieces,
        enPassant: {
          available: false,
          position: null
        },
        redoStack: [] // Limpiar la pila de rehacer
      };
    }
    
    case 'SET_EN_PASSANT': {
      return {
        ...state,
        enPassant: action.payload
      };
    }
    
    default:
      return state;
  }
}; 