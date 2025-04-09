import { useCallback } from 'react';

export function useChessGame(gameState, dispatch) {
  // Calcular los movimientos posibles para una pieza
  const calculatePossibleMoves = useCallback((piece, position) => {
    const { board, enPassant } = gameState;
    const { row, col } = position;
    const moves = [];
    
    // Función auxiliar para verificar si una casilla está dentro del tablero
    const isValidSquare = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;
    
    // Función auxiliar para verificar si una casilla está vacía o tiene una pieza enemiga
    const canMoveTo = (r, c) => {
      if (!isValidSquare(r, c)) return false;
      
      const targetPiece = board[r][c];
      return !targetPiece || targetPiece.color !== piece.color;
    };
    
    // Función auxiliar para verificar si una casilla está vacía
    const isEmpty = (r, c) => {
      if (!isValidSquare(r, c)) return false;
      return !board[r][c];
    };
    
    // Función auxiliar para verificar si una casilla tiene una pieza enemiga
    const hasEnemy = (r, c) => {
      if (!isValidSquare(r, c)) return false;
      
      const targetPiece = board[r][c];
      return targetPiece && targetPiece.color !== piece.color;
    };
    
    // Movimientos del peón
    if (piece.type === 'pawn') {
      const direction = piece.color === 'white' ? -1 : 1;
      const startRow = piece.color === 'white' ? 6 : 1;
      
      // Movimiento hacia adelante
      if (isEmpty(row + direction, col)) {
        moves.push({ from: position, to: { row: row + direction, col } });
        
        // Doble movimiento desde la posición inicial
        if (row === startRow && isEmpty(row + 2 * direction, col)) {
          moves.push({ from: position, to: { row: row + 2 * direction, col } });
        }
      }
      
      // Capturas diagonales
      if (hasEnemy(row + direction, col - 1)) {
        moves.push({ from: position, to: { row: row + direction, col: col - 1 } });
      }
      
      if (hasEnemy(row + direction, col + 1)) {
        moves.push({ from: position, to: { row: row + direction, col: col + 1 } });
      }
      
      // Captura al paso
      if (enPassant.available) {
        const epRow = enPassant.position.row;
        const epCol = enPassant.position.col;
        
        if (row === epRow && (col === epCol - 1 || col === epCol + 1)) {
          moves.push({ 
            from: position, 
            to: { row: row + direction, col: epCol },
            isEnPassant: true,
            capturePosition: { row: epRow, col: epCol }
          });
        }
      }
    }
    
    // Movimientos de la torre
    if (piece.type === 'rook' || piece.type === 'queen') {
      // Movimientos horizontales y verticales
      const directions = [
        { dr: -1, dc: 0 }, // Arriba
        { dr: 1, dc: 0 },  // Abajo
        { dr: 0, dc: -1 }, // Izquierda
        { dr: 0, dc: 1 }   // Derecha
      ];
      
      for (const { dr, dc } of directions) {
        let r = row + dr;
        let c = col + dc;
        
        while (isValidSquare(r, c)) {
          if (isEmpty(r, c)) {
            moves.push({ from: position, to: { row: r, col: c } });
          } else if (hasEnemy(r, c)) {
            moves.push({ from: position, to: { row: r, col: c } });
            break;
          } else {
            break; // Pieza propia bloqueando
          }
          
          r += dr;
          c += dc;
        }
      }
    }
    
    // Movimientos del alfil
    if (piece.type === 'bishop' || piece.type === 'queen') {
      // Movimientos diagonales
      const directions = [
        { dr: -1, dc: -1 }, // Arriba-izquierda
        { dr: -1, dc: 1 },  // Arriba-derecha
        { dr: 1, dc: -1 },  // Abajo-izquierda
        { dr: 1, dc: 1 }    // Abajo-derecha
      ];
      
      for (const { dr, dc } of directions) {
        let r = row + dr;
        let c = col + dc;
        
        while (isValidSquare(r, c)) {
          if (isEmpty(r, c)) {
            moves.push({ from: position, to: { row: r, col: c } });
          } else if (hasEnemy(r, c)) {
            moves.push({ from: position, to: { row: r, col: c } });
            break;
          } else {
            break; // Pieza propia bloqueando
          }
          
          r += dr;
          c += dc;
        }
      }
    }
    
    // Movimientos del caballo
    if (piece.type === 'knight') {
      const knightMoves = [
        { dr: -2, dc: -1 }, { dr: -2, dc: 1 },
        { dr: -1, dc: -2 }, { dr: -1, dc: 2 },
        { dr: 1, dc: -2 }, { dr: 1, dc: 2 },
        { dr: 2, dc: -1 }, { dr: 2, dc: 1 }
      ];
      
      for (const { dr, dc } of knightMoves) {
        const r = row + dr;
        const c = col + dc;
        
        if (canMoveTo(r, c)) {
          moves.push({ from: position, to: { row: r, col: c } });
        }
      }
    }
    
    // Movimientos del rey
    if (piece.type === 'king') {
      const kingMoves = [
        { dr: -1, dc: -1 }, { dr: -1, dc: 0 }, { dr: -1, dc: 1 },
        { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
        { dr: 1, dc: -1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }
      ];
      
      for (const { dr, dc } of kingMoves) {
        const r = row + dr;
        const c = col + dc;
        
        if (canMoveTo(r, c)) {
          moves.push({ from: position, to: { row: r, col: c } });
        }
      }
      
      // Enroque
      const { castling } = gameState;
      
      if (piece.color === 'white' && !castling.whiteKingMoved) {
        // Enroque corto
        if (!castling.whiteRookHMoved && 
            isEmpty(7, 5) && isEmpty(7, 6) && 
            board[7][7]?.type === 'rook' && board[7][7]?.color === 'white') {
          moves.push({ 
            from: position, 
            to: { row: 7, col: 6 },
            isCastle: true,
            rookFrom: { row: 7, col: 7 },
            rookTo: { row: 7, col: 5 }
          });
        }
        
        // Enroque largo
        if (!castling.whiteRookAMoved && 
            isEmpty(7, 1) && isEmpty(7, 2) && isEmpty(7, 3) && 
            board[7][0]?.type === 'rook' && board[7][0]?.color === 'white') {
          moves.push({ 
            from: position, 
            to: { row: 7, col: 2 },
            isCastle: true,
            rookFrom: { row: 7, col: 0 },
            rookTo: { row: 7, col: 3 }
          });
        }
      } else if (piece.color === 'black' && !castling.blackKingMoved) {
        // Enroque corto
        if (!castling.blackRookHMoved && 
            isEmpty(0, 5) && isEmpty(0, 6) && 
            board[0][7]?.type === 'rook' && board[0][7]?.color === 'black') {
          moves.push({ 
            from: position, 
            to: { row: 0, col: 6 },
            isCastle: true,
            rookFrom: { row: 0, col: 7 },
            rookTo: { row: 0, col: 5 }
          });
        }
        
        // Enroque largo
        if (!castling.blackRookAMoved && 
            isEmpty(0, 1) && isEmpty(0, 2) && isEmpty(0, 3) && 
            board[0][0]?.type === 'rook' && board[0][0]?.color === 'black') {
          moves.push({ 
            from: position, 
            to: { row: 0, col: 2 },
            isCastle: true,
            rookFrom: { row: 0, col: 0 },
            rookTo: { row: 0, col: 3 }
          });
        }
      }
    }
    
    return moves;
  }, [gameState]);

  // Realizar un movimiento
  const makeMove = useCallback((selectedPiece, targetPosition) => {
    const { piece, position } = selectedPiece;
    const possibleMoves = calculatePossibleMoves(piece, position);
    
    // Buscar el movimiento en la lista de movimientos posibles
    const move = possibleMoves.find(m => 
      m.to.row === targetPosition.row && m.to.col === targetPosition.col
    );
    
    if (!move) return false;
    
    // Manejar enroque
    if (move.isCastle) {
      dispatch({
        type: 'CASTLE',
        payload: {
          kingFrom: move.from,
          kingTo: move.to,
          rookFrom: move.rookFrom,
          rookTo: move.rookTo
        }
      });
      return true;
    }
    
    // Manejar captura al paso
    if (move.isEnPassant) {
      dispatch({
        type: 'EN_PASSANT_CAPTURE',
        payload: {
          from: move.from,
          to: move.to,
          capturePosition: move.capturePosition
        }
      });
      return true;
    }
    
    // Movimiento normal
    dispatch({
      type: 'MOVE_PIECE',
      payload: {
        from: position,
        to: targetPosition,
        piece
      }
    });
    
    // Verificar si es un movimiento de peón de dos casillas (para captura al paso)
    if (piece.type === 'pawn') {
      const startRow = piece.color === 'white' ? 6 : 1;
      if (position.row === startRow && Math.abs(targetPosition.row - position.row) === 2) {
        const enPassantRow = (position.row + targetPosition.row) / 2;
        dispatch({
          type: 'SET_EN_PASSANT',
          payload: {
            available: true,
            position: { row: enPassantRow, col: position.col }
          }
        });
      } else {
        dispatch({
          type: 'SET_EN_PASSANT',
          payload: {
            available: false,
            position: null
          }
        });
      }
      
      // Verificar promoción de peón
      const promotionRow = piece.color === 'white' ? 0 : 7;
      if (targetPosition.row === promotionRow) {
        // Automáticamente promover a reina por simplicidad
        dispatch({
          type: 'PROMOTE_PAWN',
          payload: {
            position: targetPosition,
            newType: 'queen'
          }
        });
      }
    } else {
      // Resetear estado de captura al paso si no es un movimiento de peón
      dispatch({
        type: 'SET_EN_PASSANT',
        payload: {
          available: false,
          position: null
        }
      });
    }
    
    // Actualizar estado de enroque si se mueve un rey o una torre
    if (piece.type === 'king') {
      if (piece.color === 'white') {
        dispatch({
          type: 'UPDATE_CASTLING',
          payload: { whiteKingMoved: true }
        });
      } else {
        dispatch({
          type: 'UPDATE_CASTLING',
          payload: { blackKingMoved: true }
        });
      }
    } else if (piece.type === 'rook') {
      if (piece.color === 'white') {
        if (position.col === 0) {
          dispatch({
            type: 'UPDATE_CASTLING',
            payload: { whiteRookAMoved: true }
          });
        } else if (position.col === 7) {
          dispatch({
            type: 'UPDATE_CASTLING',
            payload: { whiteRookHMoved: true }
          });
        }
      } else {
        if (position.col === 0) {
          dispatch({
            type: 'UPDATE_CASTLING',
            payload: { blackRookAMoved: true }
          });
        } else if (position.col === 7) {
          dispatch({
            type: 'UPDATE_CASTLING',
            payload: { blackRookHMoved: true }
          });
        }
      }
    }
    
    return true;
  }, [calculatePossibleMoves, dispatch]);

  // Movimiento de la computadora (IA simple)
  const computerMove = useCallback(() => {
    const { board, currentPlayer } = gameState;
    
    if (currentPlayer !== 'black') return;
    
    // Recopilar todas las piezas de la computadora
    const computerPieces = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === 'black') {
          computerPieces.push({
            piece,
            position: { row, col }
          });
        }
      }
    }
    
    // Recopilar todos los movimientos posibles
    let allMoves = [];
    for (const { piece, position } of computerPieces) {
      const moves = calculatePossibleMoves(piece, position);
      allMoves = [...allMoves, ...moves.map(move => ({
        ...move,
        piece,
        from: position
      }))];
    }
    
    if (allMoves.length === 0) return;
    
    // Priorizar movimientos de captura
    const captureMoves = allMoves.filter(move => 
      board[move.to.row][move.to.col] !== null
    );
    
    // Elegir un movimiento aleatorio, priorizando capturas
    const movesToChooseFrom = captureMoves.length > 0 ? captureMoves : allMoves;
    const randomMove = movesToChooseFrom[Math.floor(Math.random() * movesToChooseFrom.length)];
    
    // Realizar el movimiento
    makeMove({ piece: randomMove.piece, position: randomMove.from }, randomMove.to);
  }, [gameState, calculatePossibleMoves, makeMove]);

  // Verificar si el rey está en jaque
  const isCheck = useCallback(() => {
    const { board, currentPlayer } = gameState;
    
    // Encontrar la posición del rey
    let kingPosition = null;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.type === 'king' && piece.color === currentPlayer) {
          kingPosition = { row, col };
          break;
        }
      }
      if (kingPosition) break;
    }
    
    if (!kingPosition) return false;
    
    // Verificar si alguna pieza enemiga puede capturar al rey
    const enemyColor = currentPlayer === 'white' ? 'black' : 'white';
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === enemyColor) {
          const moves = calculatePossibleMoves(piece, { row, col });
          if (moves.some(move => 
            move.to.row === kingPosition.row && move.to.col === kingPosition.col
          )) {
            return true;
          }
        }
      }
    }
    
    return false;
  }, [gameState, calculatePossibleMoves]);

  // Verificar si hay jaque mate
  const isCheckmate = useCallback(() => {
    if (!isCheck()) return false;
    
    const { board, currentPlayer } = gameState;
    
    // Verificar si hay algún movimiento legal que saque al rey del jaque
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === currentPlayer) {
          const moves = calculatePossibleMoves(piece, { row, col });
          
          // Simular cada movimiento para ver si saca al rey del jaque
          for (const move of moves) {
            // Crear una copia del tablero
            const tempBoard = board.map(r => [...r]);
            
            // Realizar el movimiento en la copia
            tempBoard[move.to.row][move.to.col] = piece;
            tempBoard[row][col] = null;
            
            // Verificar si el rey sigue en jaque después del movimiento
            let kingPos = null;
            for (let r = 0; r < 8; r++) {
              for (let c = 0; c < 8; c++) {
                const p = tempBoard[r][c];
                if (p && p.type === 'king' && p.color === currentPlayer) {
                  kingPos = { row: r, col: c };
                  break;
                }
              }
              if (kingPos) break;
            }
            
            // Verificar si alguna pieza enemiga puede capturar al rey
            let stillInCheck = false;
            const enemyColor = currentPlayer === 'white' ? 'black' : 'white';
            
            for (let r = 0; r < 8; r++) {
              for (let c = 0; c < 8; c++) {
                const p = tempBoard[r][c];
                if (p && p.color === enemyColor) {
                  // Simplificación: usar la lógica de movimiento normal
                  // En una implementación real, habría que duplicar la lógica de movimiento
                  const enemyMoves = calculatePossibleMoves(p, { row: r, col: c });
                  if (enemyMoves.some(m => 
                    m.to.row === kingPos.row && m.to.col === kingPos.col
                  )) {
                    stillInCheck = true;
                    break;
                  }
                }
              }
              if (stillInCheck) break;
            }
            
            if (!stillInCheck) {
              return false; // Hay al menos un movimiento que saca al rey del jaque
            }
          }
        }
      }
    }
    
    return true; // No hay movimientos que saquen al rey del jaque
  }, [gameState, isCheck, calculatePossibleMoves]);

  // Verificar si hay tablas por rey ahogado
  const isStalemate = useCallback(() => {
    if (isCheck()) return false;
    
    const { board, currentPlayer } = gameState;
    
    // Verificar si hay algún movimiento legal
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === currentPlayer) {
          const moves = calculatePossibleMoves(piece, { row, col });
          if (moves.length > 0) {
            return false; // Hay al menos un movimiento legal
          }
        }
      }
    }
    
    return true; // No hay movimientos legales
  }, [gameState, isCheck, calculatePossibleMoves]);

  // Analizar la posición actual y sugerir un movimiento
  const analyzePosition = useCallback((board, playerColor) => {
    // Recopilar todas las piezas del jugador
    const playerPieces = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === playerColor) {
          playerPieces.push({
            piece,
            position: { row, col }
          });
        }
      }
    }
    
    // Recopilar todos los movimientos posibles
    let allMoves = [];
    for (const { piece, position } of playerPieces) {
      const moves = calculatePossibleMoves(piece, position);
      allMoves = [...allMoves, ...moves.map(move => ({
        ...move,
        piece,
        from: position,
        score: 0 // Inicializar puntuación
      }))];
    }
    
    if (allMoves.length === 0) return null;
    
    // Evaluar cada movimiento
    for (const move of allMoves) {
      // Puntuar capturas
      if (board[move.to.row][move.to.col]) {
        const capturedPiece = board[move.to.row][move.to.col];
        // Valor de las piezas
        const pieceValues = {
          pawn: 1,
          knight: 3,
          bishop: 3,
          rook: 5,
          queen: 9,
          king: 100
        };
        
        // Añadir puntuación por captura
        move.score += pieceValues[capturedPiece.type.toLowerCase()] || 1;
      }
      
      // Puntuar control del centro
      const centerRows = [3, 4];
      const centerCols = [3, 4];
      if (centerRows.includes(move.to.row) && centerCols.includes(move.to.col)) {
        move.score += 0.5;
      }
      
      // Puntuar desarrollo de piezas (mover piezas de su posición inicial)
      if (move.piece.type !== 'pawn') {
        const isInitialPosition = 
          (move.piece.color === 'white' && move.from.row === 7) ||
          (move.piece.color === 'black' && move.from.row === 0);
        
        if (isInitialPosition) {
          move.score += 0.3;
        }
      }
      
      // Puntuar enroque (seguridad del rey)
      if (move.isCastle) {
        move.score += 1;
      }
    }
    
    // Ordenar movimientos por puntuación
    allMoves.sort((a, b) => b.score - a.score);
    
    // Devolver el mejor movimiento
    return {
      from: allMoves[0].from,
      to: allMoves[0].to,
      piece: allMoves[0].piece,
      score: allMoves[0].score
    };
  }, [calculatePossibleMoves]);

  return {
    calculatePossibleMoves,
    makeMove,
    computerMove,
    isCheck,
    isCheckmate,
    isStalemate,
    analyzePosition
  };
} 