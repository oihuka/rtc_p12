import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import '../styles/Board.css';

// Componente para las coordenadas del tablero
const BoardCoordinates = memo(({ type, index }) => {
  const label = type === 'file' 
    ? String.fromCharCode(97 + index) // a-h
    : 8 - index; // 8-1
  
  // Para las coordenadas alfabéticas, necesitamos ajustar la posición vertical
  const style = type === 'file' 
    ? { position: 'absolute', left: '50%', top: type === 'file' ? '1px' : 'auto', transform: 'translateX(-50%)', width: '100%', lineHeight: '1' } 
    : {};
  
  return (
    <div 
      className={`board-coordinate ${type}`}
      aria-hidden="true"
      style={style}
    >
      {label}
    </div>
  );
});

BoardCoordinates.displayName = 'BoardCoordinates';

BoardCoordinates.propTypes = {
  type: PropTypes.oneOf(['file', 'rank']).isRequired,
  index: PropTypes.number.isRequired
};

// Componente principal del tablero
const Board = memo(function Board({ board, selectedPiece, possibleMoves, highlightedSquares, onPieceSelect, showHints }) {
  const [containerStyle, setContainerStyle] = useState({});
  
  // Ajustar el tamaño del tablero según el tamaño de la ventana
  useEffect(() => {
    const updateBoardSize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculamos un tamaño máximo basado en el espacio disponible
      // Para tableros de ajedrez, 75% del ancho o 75% del alto es una buena proporción
      const maxWidth = windowWidth * 0.75;
      const maxHeight = windowHeight * 0.75;
      
      // Tomamos el menor para asegurarnos que el tablero cabe en la pantalla
      // y mantiene su proporción cuadrada
      let size = Math.min(maxWidth, maxHeight);
      
      // El tablero tiene coordenadas alrededor, así que necesitamos tener en cuenta esas dimensiones
      // Las coordenadas ocupan aproximadamente un 8% del tamaño total (4% de cada lado)
      const actualBoardSize = size * 0.92; // El 92% del espacio para el tablero real
      
      // Nos aseguramos que el tablero tenga un tamaño que sea divisible por 8
      // para que cada casilla tenga exactamente el mismo tamaño
      const squareSize = Math.floor(actualBoardSize / 8);
      const adjustedBoardSize = squareSize * 8;
      
      // Recalculamos el tamaño total incluyendo coordenadas
      const totalSize = adjustedBoardSize / 0.92; // Ajustar para incluir el espacio de las coordenadas
      
      setContainerStyle({
        width: `${totalSize}px`,
        height: `${totalSize}px`,
      });
    };
    
    updateBoardSize();
    window.addEventListener('resize', updateBoardSize);
    
    return () => {
      window.removeEventListener('resize', updateBoardSize);
    };
  }, []);

  // Verificar si una casilla es un movimiento posible
  const isValidMove = (row, col) => {
    return possibleMoves.some(move => 
      move.to.row === row && move.to.col === col
    );
  };

  // Verificar si una casilla está seleccionada
  const isSelected = (row, col) => {
    return selectedPiece && 
      selectedPiece.position.row === row && 
      selectedPiece.position.col === col;
  };

  // Verificar si una casilla está destacada por el entrenador
  const getHighlightType = (row, col) => {
    const highlighted = highlightedSquares.find(square => 
      square.row === row && square.col === col
    );
    return highlighted ? highlighted.type : null;
  };

  // Renderizar las filas y columnas del tablero
  const renderBoard = () => {
    const rows = [];
    
    // Fila superior de coordenadas (a-h)
    const topFileCoordinates = [];
    topFileCoordinates.push(<div key="empty-corner-top-left" className="board-coordinate empty"></div>);
    
    for (let col = 0; col < 8; col++) {
      topFileCoordinates.push(
        <div key={`file-container-top-${col}`} style={{ width: '12.5%', position: 'relative' }}>
          <BoardCoordinates key={`file-top-${col}`} type="file" index={col} />
        </div>
      );
    }
    
    // Añadir una esquina extra para balancear el tablero
    topFileCoordinates.push(<div key="empty-corner-top-right" className="board-coordinate empty"></div>);
    
    rows.push(
      <div key="file-coordinates-top" className="board-row coordinates" role="row">
        {topFileCoordinates}
      </div>
    );
    
    // Filas del tablero con casillas
    for (let row = 0; row < 8; row++) {
      const squares = [];
      
      // Añadir coordenada de fila (8-1)
      squares.push(
        <BoardCoordinates key={`rank-${row}`} type="rank" index={row} />
      );
      
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        const isLight = (row + col) % 2 === 0;
        const validMove = isValidMove(row, col);
        const selected = isSelected(row, col);
        const highlightType = getHighlightType(row, col);
        
        squares.push(
          <Square
            key={`${row}-${col}`}
            isLight={isLight}
            piece={piece}
            row={row}
            col={col}
            isValidMove={validMove}
            isSelected={selected}
            highlightType={highlightType}
            showHint={showHints && validMove}
            onSelect={() => handleSquareSelect(row, col)}
          />
        );
      }
      
      // Añadir coordenada de fila al final
      squares.push(
        <BoardCoordinates key={`rank-right-${row}`} type="rank" index={row} />
      );
      
      rows.push(
        <div key={`row-${row}`} className="board-row" role="row">
          {squares}
        </div>
      );
    }
    
    // Añadir fila inferior de coordenadas de columna (a-h)
    const bottomFileCoordinates = [];
    bottomFileCoordinates.push(<div key="empty-corner-bottom-left" className="board-coordinate empty"></div>);
    
    for (let col = 0; col < 8; col++) {
      bottomFileCoordinates.push(
        <div key={`file-container-bottom-${col}`} style={{ width: '12.5%', position: 'relative' }}>
          <BoardCoordinates key={`file-bottom-${col}`} type="file" index={col} />
        </div>
      );
    }
    
    // Añadir una esquina extra para balancear el tablero
    bottomFileCoordinates.push(<div key="empty-corner-bottom-right" className="board-coordinate empty"></div>);
    
    rows.push(
      <div key="file-coordinates-bottom" className="board-row coordinates" role="row">
        {bottomFileCoordinates}
      </div>
    );
    
    return rows;
  };

  // Manejar la selección de una casilla
  const handleSquareSelect = (row, col) => {
    onPieceSelect(row, col);
  };

  return (
    <section 
      className="board-container"
      style={containerStyle}
      aria-label="Tablero de ajedrez"
    >
      <div 
        className="chess-board" 
        role="grid" 
        aria-label="Tablero de ajedrez interactivo"
      >
        {renderBoard()}
      </div>
    </section>
  );
});

Board.displayName = 'Board';

Board.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        color: PropTypes.string
      })
    )
  ).isRequired,
  selectedPiece: PropTypes.shape({
    piece: PropTypes.shape({
      type: PropTypes.string,
      color: PropTypes.string
    }),
    position: PropTypes.shape({
      row: PropTypes.number,
      col: PropTypes.number
    })
  }),
  possibleMoves: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.shape({
        row: PropTypes.number,
        col: PropTypes.number
      }),
      to: PropTypes.shape({
        row: PropTypes.number,
        col: PropTypes.number
      })
    })
  ),
  highlightedSquares: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.number,
      col: PropTypes.number,
      type: PropTypes.string
    })
  ),
  onPieceSelect: PropTypes.func.isRequired,
  showHints: PropTypes.bool
};

Board.defaultProps = {
  selectedPiece: null,
  possibleMoves: [],
  highlightedSquares: [],
  showHints: true
};

export default Board; 