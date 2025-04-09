/**
 * Valores estándar de las piezas de ajedrez
 * Estos valores son utilizados para evaluar posiciones y recomendar jugadas
 */

export const PIECE_VALUES = {
  pawn: 1,
  knight: 3,
  bishop: 3,
  rook: 5,
  queen: 9,
  king: 100 // Valor arbitrariamente alto para el rey, ya que no puede ser capturado
};

/**
 * Evalúa el valor material de una posición
 * @param {Array} board - El tablero actual
 * @returns {Number} - La diferencia de material (positivo favorece a blancas, negativo a negras)
 */
export const evaluateMaterialBalance = (board) => {
  let materialBalance = 0;
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const { type, color } = piece;
        const value = PIECE_VALUES[type] || 0;
        materialBalance += color === 'white' ? value : -value;
      }
    }
  }
  
  return materialBalance;
};

/**
 * Evalúa si un intercambio de piezas es favorable
 * @param {Object} capturedPiece - La pieza que sería capturada
 * @param {Object} capturingPiece - La pieza que realiza la captura
 * @returns {Boolean} - True si el intercambio es favorable
 */
export const isGoodExchange = (capturedPiece, capturingPiece) => {
  if (!capturedPiece || !capturingPiece) return false;
  
  const capturedValue = PIECE_VALUES[capturedPiece.type] || 0;
  const capturingValue = PIECE_VALUES[capturingPiece.type] || 0;
  
  // Si la pieza capturada vale más que la que captura, es un buen intercambio
  return capturedValue > capturingValue;
};

/**
 * Evalúa si un movimiento es bueno basado en el valor de las piezas
 * @param {Object} move - El movimiento a evaluar
 * @param {Array} board - El tablero actual
 * @returns {Object} - Evaluación del movimiento
 */
export const evaluateMove = (move, board) => {
  if (!move) return { score: 0, explanation: '' };
  
  const { to, piece } = move;
  const targetPiece = board[to.row][to.col];
  
  // Si es una captura, evaluar el intercambio
  if (targetPiece) {
    const capturedValue = PIECE_VALUES[targetPiece.type];
    const movingValue = PIECE_VALUES[piece.type];
    
    if (capturedValue > movingValue) {
      return {
        score: capturedValue - movingValue,
        explanation: `Buena captura: ganas ${capturedValue - movingValue} puntos de material`
      };
    } else if (capturedValue === movingValue) {
      return {
        score: 0,
        explanation: 'Intercambio equilibrado'
      };
    } else {
      return {
        score: capturedValue - movingValue,
        explanation: `Intercambio desfavorable: pierdes ${movingValue - capturedValue} puntos de material`
      };
    }
  }
  
  // Para movimientos que no son capturas, devolver una evaluación neutral
  return { score: 0, explanation: '' };
}; 