import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaLightbulb, FaChessKnight, FaTimes, FaInfoCircle, FaChevronDown, FaChevronUp, FaGraduationCap } from 'react-icons/fa';
import { evaluateMaterialBalance, PIECE_VALUES } from '../utils/pieceValues';
import '../styles/ChessCoach.css';

function ChessCoach({ gameState, lastMove, onHintRequest, activeLesson }) {
  const [showCoach, setShowCoach] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('greeting');
  const [showStrategies, setShowStrategies] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState(null);
  const [aiTips, setAiTips] = useState([]);

  // Estrategias disponibles
  const strategies = [
    {
      id: 'control-center',
      name: 'Control del centro',
      description: 'Controlar el centro del tablero te da más opciones de movimiento y mejor posición.',
      tips: [
        'Mueve tus peones centrales (e y d) al principio',
        'Desarrolla tus piezas menores hacia el centro',
        'Evita mover demasiado los peones del flanco'
      ]
    },
    {
      id: 'piece-development',
      name: 'Desarrollo de piezas',
      description: 'Desarrolla tus piezas rápidamente para tener ventaja en la apertura.',
      tips: [
        'Desarrolla caballos y alfiles antes que torres y dama',
        'Enroca pronto para proteger al rey',
        'Conecta tus torres en la apertura'
      ]
    },
    {
      id: 'king-safety',
      name: 'Seguridad del rey',
      description: 'Mantén a tu rey seguro, especialmente en la apertura y el medio juego.',
      tips: [
        'Enroca lo antes posible',
        'Mantén una estructura de peones sólida frente a tu rey',
        'Evita avanzar los peones que protegen a tu rey enrocado'
      ]
    }
  ];

  // Generar mensajes basados en el estado del juego y los movimientos
  useEffect(() => {
    if (!showCoach) return;

    // Evaluar el balance material actual
    const materialBalance = evaluateMaterialBalance(gameState.board);
    
    // Analizar el último movimiento si existe
    if (lastMove) {
      // Si fue una captura, evaluar si fue un buen intercambio
      if (lastMove.capturedPiece) {
        const { piece, capturedPiece } = lastMove;
        const capturedValue = PIECE_VALUES[capturedPiece.type];
        const movingValue = PIECE_VALUES[piece.type];
        
        if (capturedValue > movingValue) {
          if (lastMove.player === 'white') {
            setMessage(`¡Buen movimiento! Has capturado una ${getSpanishPieceName(capturedPiece.type)} (${capturedValue} puntos) con tu ${getSpanishPieceName(piece.type)} (${movingValue} puntos). Has ganado ${capturedValue - movingValue} puntos de material.`);
          } else {
            setMessage(`El ordenador ha capturado tu ${getSpanishPieceName(capturedPiece.type)} (${capturedValue} puntos) con su ${getSpanishPieceName(piece.type)} (${movingValue} puntos). Ha ganado ${capturedValue - movingValue} puntos de material.`);
          }
          setMessageType('capture');
        } else if (capturedValue === movingValue) {
          setMessage(`Se ha producido un intercambio equilibrado. Ambas piezas valen ${capturedValue} puntos.`);
          setMessageType('neutral');
        } else {
          if (lastMove.player === 'white') {
            setMessage(`Has capturado una ${getSpanishPieceName(capturedPiece.type)} (${capturedValue} puntos) con tu ${getSpanishPieceName(piece.type)} (${movingValue} puntos). Has perdido ${movingValue - capturedValue} puntos de material. Ten cuidado con estos intercambios desfavorables.`);
          } else {
            setMessage(`El ordenador ha sacrificado su ${getSpanishPieceName(piece.type)} (${movingValue} puntos) para capturar tu ${getSpanishPieceName(capturedPiece.type)} (${capturedValue} puntos). Podría ser parte de una estrategia.`);
          }
          setMessageType('warning');
        }
      } else {
        // Si el jugador está en jaque
        if (gameState.check && gameState.currentPlayer === 'white') {
          setMessage('¡Cuidado! Tu rey está en jaque. Debes mover tu rey o bloquear el ataque.');
          setMessageType('advice');
          return;
        }

        // Si el jugador hizo un movimiento normal
        if (lastMove.piece.color === 'black') {
          const pieceNames = {
            pawn: 'peón',
            knight: 'caballo',
            bishop: 'alfil',
            rook: 'torre',
            queen: 'reina',
            king: 'rey'
          };
          
          const pieceName = pieceNames[lastMove.piece.type.toLowerCase()] || lastMove.piece.type;
          const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
          const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
          const fromSquare = files[lastMove.from.col] + ranks[lastMove.from.row];
          const toSquare = files[lastMove.to.col] + ranks[lastMove.to.row];
          
          setMessage(`Tu oponente ha movido su ${pieceName} de ${fromSquare} a ${toSquare}. Piensa en tu próximo movimiento.`);
          setMessageType('advice');
          return;
        }
      }
    } else {
      // Mensaje inicial
      setMessage('¡Bienvenido! Soy tu entrenador de ajedrez. Te ayudaré a mejorar tu juego con consejos y estrategias.');
      setMessageType('greeting');
    }

    // Actualizar consejos de IA basados en el balance material
    if (materialBalance > 3) {
      setAiTips([
        'Tienes ventaja material. Considera simplificar la posición mediante intercambios.',
        'Con ventaja material, evita tomar riesgos innecesarios.',
        'Recuerda que una dama (9 puntos) vale más que una torre (5 puntos) y un alfil (3 puntos).'
      ]);
    } else if (materialBalance < -3) {
      setAiTips([
        'Estás en desventaja material. Busca complicar la posición.',
        'Intenta crear amenazas tácticas para recuperar material.',
        'Recuerda que dos alfiles o caballos (6 puntos) valen más que una torre (5 puntos).'
      ]);
    } else {
      // Balance material equilibrado
      // Fase de apertura (primeros 10 movimientos)
      if (gameState.moveHistory.length < 10) {
        setAiTips([
          "Controla el centro con peones y piezas menores",
          "Desarrolla tus piezas menores (caballos y alfiles) antes que las torres y la dama",
          "Enroca pronto para proteger a tu rey",
          "Evita mover la misma pieza varias veces en la apertura"
        ]);
      } 
      // Fase media (entre 10 y 30 movimientos)
      else if (gameState.moveHistory.length < 30) {
        setAiTips([
          "Busca oportunidades tácticas como horquillas y clavadas",
          "Coordina tus piezas para atacar objetivos débiles",
          "Mantén tus piezas protegidas y conectadas",
          "Considera sacrificios posicionales para obtener ventaja"
        ]);
      } 
      // Fase final (más de 30 movimientos)
      else {
        setAiTips([
          "Activa tu rey en el final de partida",
          "Avanza tus peones pasados hacia la promoción",
          "Centraliza tus piezas para maximizar su efectividad",
          "Simplifica la posición si tienes ventaja material"
        ]);
      }

      // Si hay una lección activa, añadir consejos específicos
      if (activeLesson) {
        switch (activeLesson.id) {
          case 'opening':
            setAiTips(prevTips => [...prevTips, "Apertura: Controla el centro con peones y piezas"]);
            break;
          case 'tactics':
            setAiTips(prevTips => [...prevTips, "Táctica: Busca combinaciones que ganen material"]);
            break;
          case 'endgame':
            setAiTips(prevTips => [...prevTips, "Final: Activa tu rey y avanza tus peones pasados"]);
            break;
          default:
            break;
        }
      }
    }
  }, [gameState, lastMove, showCoach]);

  // Solicitar una pista
  const requestHint = () => {
    onHintRequest();
    setMessage('Analicemos la posición actual. He destacado un posible movimiento para ti. Considera sus implicaciones estratégicas.');
    setMessageType('hint');
  };

  // Mostrar detalles de una estrategia
  const showStrategyDetails = (strategy) => {
    setCurrentStrategy(strategy);
  };

  // Volver a la lista de estrategias
  const backToStrategies = () => {
    setCurrentStrategy(null);
  };

  // Función para obtener el nombre en español de las piezas
  const getSpanishPieceName = (pieceType) => {
    const pieceNames = {
      pawn: 'peón',
      knight: 'caballo',
      bishop: 'alfil',
      rook: 'torre',
      queen: 'dama',
      king: 'rey'
    };
    return pieceNames[pieceType] || pieceType;
  };

  if (!showCoach) {
    return (
      <button 
        className="coach-toggle" 
        onClick={() => setShowCoach(true)}
        aria-label="Mostrar entrenador de ajedrez"
      >
        <FaChessKnight aria-hidden="true" />
        <span>Mostrar entrenador</span>
      </button>
    );
  }

  return (
    <article className={`chess-coach ${messageType}`}>
      <header className="coach-header">
        <div className="coach-avatar" aria-hidden="true">
          <FaChessKnight />
        </div>
        <h3>Entrenador de Ajedrez</h3>
        <button 
          className="close-coach" 
          onClick={() => setShowCoach(false)}
          aria-label="Cerrar entrenador"
        >
          <FaTimes aria-hidden="true" />
        </button>
      </header>
      
      <div className="coach-content">
        <div className="coach-message" aria-live="polite">
          <p>{message}</p>
        </div>
        
        <div className="coach-tips">
          <h4>
            <FaGraduationCap aria-hidden="true" />
            <span>Consejos de IA</span>
          </h4>
          <ul>
            {aiTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
        
        <div className="coach-strategies">
          <button 
            className="strategies-toggle"
            onClick={() => setShowStrategies(!showStrategies)}
            aria-expanded={showStrategies}
            aria-controls="strategies-panel"
          >
            <span>Estrategias recomendadas</span>
            {showStrategies ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
          </button>
          
          {showStrategies && (
            <div id="strategies-panel" className="strategies-panel">
              {!currentStrategy ? (
                <ul className="strategies-list">
                  {strategies.map(strategy => (
                    <li key={strategy.id} className="strategy-item">
                      <div className="strategy-header">
                        <h4>{strategy.name}</h4>
                        <button 
                          className="info-button"
                          onClick={() => showStrategyDetails(strategy)}
                          aria-label={`Ver detalles de ${strategy.name}`}
                        >
                          <FaInfoCircle aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="strategy-details">
                  <button 
                    className="back-button"
                    onClick={backToStrategies}
                    aria-label="Volver a la lista de estrategias"
                  >
                    &larr; Volver
                  </button>
                  <h4>{currentStrategy.name}</h4>
                  <p>{currentStrategy.description}</p>
                  <h5>Consejos:</h5>
                  <ul className="strategy-tips">
                    {currentStrategy.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="coach-actions">
          <button 
            className="hint-button" 
            onClick={requestHint}
            aria-label="Solicitar pista"
          >
            <FaLightbulb aria-hidden="true" />
            <span>Dame una pista</span>
          </button>
          
          {activeLesson && (
            <div className="active-lesson-indicator">
              <span>Lección activa:</span>
              <strong>{activeLesson.title}</strong>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

ChessCoach.propTypes = {
  gameState: PropTypes.object.isRequired,
  lastMove: PropTypes.object,
  onHintRequest: PropTypes.func.isRequired,
  activeLesson: PropTypes.object
};

ChessCoach.defaultProps = {
  lastMove: null,
  activeLesson: null
};

export default ChessCoach; 