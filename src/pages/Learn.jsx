import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MiniBoard from '../components/MiniBoard';
import LoadingSpinner from '../components/LoadingSpinner';
import { usePieceInfo } from '../hooks/usePieceInfo';
import { PIECE_VALUES } from '../utils/pieceValues';
import '../styles/Learn.css';

function Learn() {
  const { pieceId } = useParams();
  const { pieceInfo, loading, error } = usePieceInfo(pieceId);
  const [currentExample, setCurrentExample] = useState(0);

  // Navegar a la siguiente pieza
  const navigateToNextPiece = () => {
    const pieces = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
    const currentIndex = pieces.indexOf(pieceId);
    const nextIndex = (currentIndex + 1) % pieces.length;
    return pieces[nextIndex];
  };

  // Navegar a la pieza anterior
  const navigateToPrevPiece = () => {
    const pieces = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
    const currentIndex = pieces.indexOf(pieceId);
    const prevIndex = (currentIndex - 1 + pieces.length) % pieces.length;
    return pieces[prevIndex];
  };

  // Cambiar al siguiente ejemplo
  const nextExample = () => {
    if (pieceInfo && pieceInfo.examples && currentExample < pieceInfo.examples.length - 1) {
      setCurrentExample(currentExample + 1);
    }
  };

  // Cambiar al ejemplo anterior
  const prevExample = () => {
    if (currentExample > 0) {
      setCurrentExample(currentExample - 1);
    }
  };

  // Obtener la URL de la imagen de la pieza
  const getPieceImageUrl = (pieceType, color = 'white') => {
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
    const pieceTypeCode = typeMap[pieceType.toLowerCase()] || 'P';
    
    // URL base para las piezas de Lichess Fantasy
    return `https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/fantasy/${colorPrefix}${pieceTypeCode}.svg`;
  };

  if (loading) return <LoadingSpinner message={`Cargando información sobre ${pieceId}...`} />;
  if (error) return <div className="error-message">{error}</div>;
  if (!pieceInfo) return <div className="error-message">No se encontró información para esta pieza.</div>;

  const pieceValue = PIECE_VALUES[pieceId] || 'Valor especial';

  return (
    <main className="learn-page">
      <nav className="piece-navigation" aria-label="Navegación entre piezas">
        <Link to={`/learn/${navigateToPrevPiece()}`} className="nav-button prev">
          &laquo; Pieza anterior
        </Link>
        <h1 className="piece-title">{pieceInfo.name}</h1>
        <Link to={`/learn/${navigateToNextPiece()}`} className="nav-button next">
          Siguiente pieza &raquo;
        </Link>
      </nav>

      <section className="piece-content">
        <div className="piece-info-container">
          <div className="piece-image-container">
            <img 
              src={getPieceImageUrl(pieceId)} 
              alt={`Pieza de ajedrez: ${pieceInfo.name}`} 
              className="piece-image"
            />
            <div className="piece-value">
              <span className="value-label">Valor:</span>
              <span className="value-number">{pieceValue}</span>
            </div>
          </div>
          
          <article className="piece-description">
            <section>
              <h2>Descripción</h2>
              <p>{pieceInfo.description}</p>
            </section>
            
            <section>
              <h2>Movimientos</h2>
              <p>{pieceInfo.movement}</p>
            </section>
            
            {pieceInfo.specialRules && (
              <section>
                <h2>Reglas especiales</h2>
                <p>{pieceInfo.specialRules}</p>
              </section>
            )}
          </article>
        </div>

        {pieceInfo.examples && pieceInfo.examples.length > 0 && (
          <section className="piece-examples">
            <h2>Ejemplos de movimientos</h2>
            <div className="example-container">
              <div className="example-controls">
                <button 
                  onClick={prevExample} 
                  disabled={currentExample === 0}
                  className="example-nav prev"
                  aria-label="Ejemplo anterior"
                >
                  &laquo;
                </button>
                <span className="example-counter">
                  {currentExample + 1} / {pieceInfo.examples.length}
                </span>
                <button 
                  onClick={nextExample} 
                  disabled={currentExample === pieceInfo.examples.length - 1}
                  className="example-nav next"
                  aria-label="Siguiente ejemplo"
                >
                  &raquo;
                </button>
              </div>
              
              <div className="example-board">
                <MiniBoard 
                  position={pieceInfo.examples[currentExample].position} 
                  moves={pieceInfo.examples[currentExample].moves}
                />
              </div>
              
              <p className="example-description">
                {pieceInfo.examples[currentExample].description}
              </p>
            </div>
          </section>
        )}

        {pieceInfo.strategies && pieceInfo.strategies.length > 0 && (
          <section className="piece-strategies">
            <h2>Estrategias</h2>
            <ul className="strategies-list">
              {pieceInfo.strategies.map((strategy, index) => (
                <li key={index} className="strategy-item">
                  <h3>{strategy.name}</h3>
                  <p>{strategy.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}

export default Learn; 