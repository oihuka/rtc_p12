import { useState, useEffect } from 'react';

export function usePieceInfo(pieceId) {
  const [pieceInfo, setPieceInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPieceInfo = async () => {
      setLoading(true);
      
      try {
        // En una aplicación real, esto podría ser una llamada a una API
        // Aquí simulamos una carga de datos con un pequeño retraso
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Datos de ejemplo para cada pieza
        const piecesData = {
          pawn: {
            name: 'Peón',
            image: '/assets/pieces/white_pawn.svg',
            description: 'El peón es la pieza más numerosa y, a menudo, considerada la más débil. Sin embargo, su potencial para promocionar a piezas más poderosas los hace muy valiosos en el juego final.',
            movement: 'Los peones se mueven hacia adelante una casilla, pero en su primer movimiento pueden avanzar dos casillas. Capturan en diagonal.',
            specialRules: 'Promoción: Al llegar a la última fila, un peón puede convertirse en cualquier otra pieza (excepto rey). Captura al paso: Un peón puede capturar a otro peón que ha avanzado dos casillas en un solo movimiento, como si hubiera avanzado solo una.',
            value: 'Un peón vale aproximadamente 1 punto.',
            examples: [
              {
                position: [
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, { type: 'pawn', color: 'white' }, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null]
                ],
                moves: [
                  { row: 3, col: 2 }
                ],
                description: 'El peón se mueve una casilla hacia adelante.'
              },
              {
                position: [
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, { type: 'pawn', color: 'black' }, null, { type: 'pawn', color: 'black' }, null, null, null, null],
                  [null, null, { type: 'pawn', color: 'white' }, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null]
                ],
                moves: [
                  { row: 4, col: 1 },
                  { row: 4, col: 3 }
                ],
                description: 'El peón captura en diagonal.'
              },
              {
                position: [
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, { type: 'pawn', color: 'white' }, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null]
                ],
                moves: [
                  { row: 5, col: 2 },
                  { row: 4, col: 2 }
                ],
                description: 'En su primer movimiento, el peón puede avanzar una o dos casillas.'
              }
            ],
            strategies: [
              {
                name: 'Estructura de peones',
                description: 'Mantener una estructura de peones sólida es fundamental. Los peones aislados o doblados suelen ser debilidades.'
              },
              {
                name: 'Peones pasados',
                description: 'Un peón pasado (sin peones enemigos que puedan bloquearlo) es una gran ventaja, especialmente en el final de la partida.'
              },
              {
                name: 'Cadena de peones',
                description: 'Los peones que se protegen entre sí forman una cadena fuerte que puede controlar el centro y limitar la movilidad de las piezas enemigas.'
              }
            ]
          },
          knight: {
            name: 'Caballo',
            image: '/assets/pieces/white_knight.svg',
            description: 'El caballo es una pieza única que se mueve en forma de "L". Es la única pieza que puede saltar sobre otras piezas.',
            movement: 'El caballo se mueve dos casillas en una dirección (horizontal o vertical) y luego una casilla en dirección perpendicular, formando una "L".',
            value: 'Un caballo vale aproximadamente 3 puntos.',
            examples: [
              {
                position: [
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, { type: 'knight', color: 'white' }, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null]
                ],
                moves: [
                  { row: 2, col: 2 },
                  { row: 2, col: 4 },
                  { row: 3, col: 1 },
                  { row: 3, col: 5 },
                  { row: 5, col: 1 },
                  { row: 5, col: 5 },
                  { row: 6, col: 2 },
                  { row: 6, col: 4 }
                ],
                description: 'El caballo puede moverse a cualquiera de estas 8 posiciones, formando una "L".'
              },
              {
                position: [
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, { type: 'pawn', color: 'white' }, null, { type: 'pawn', color: 'black' }, null, null, null],
                  [null, { type: 'pawn', color: 'white' }, null, null, null, { type: 'pawn', color: 'black' }, null, null],
                  [null, null, null, { type: 'knight', color: 'white' }, null, null, null, null],
                  [null, { type: 'pawn', color: 'white' }, null, null, null, { type: 'pawn', color: 'black' }, null, null],
                  [null, null, { type: 'pawn', color: 'white' }, null, { type: 'pawn', color: 'black' }, null, null, null],
                  [null, null, null, null, null, null, null, null]
                ],
                moves: [
                  { row: 2, col: 2 },
                  { row: 2, col: 4 },
                  { row: 3, col: 1 },
                  { row: 3, col: 5 },
                  { row: 5, col: 1 },
                  { row: 5, col: 5 },
                  { row: 6, col: 2 },
                  { row: 6, col: 4 }
                ],
                description: 'El caballo puede saltar sobre otras piezas, tanto propias como enemigas.'
              }
            ],
            strategies: [
              {
                name: 'Puestos avanzados',
                description: 'Un caballo en un puesto avanzado (casilla central protegida por un peón) es muy poderoso.'
              },
              {
                name: 'Caballo vs Alfil',
                description: 'Los caballos son mejores en posiciones cerradas, mientras que los alfiles son mejores en posiciones abiertas.'
              },
              {
                name: 'Maniobras de caballo',
                description: 'A menudo es útil reposicionar un caballo a través de una serie de movimientos para alcanzar una casilla estratégica.'
              }
            ]
          },
          bishop: {
            name: 'Alfil',
            image: '/assets/pieces/white_bishop.svg',
            description: 'El alfil se mueve en diagonal y siempre permanece en casillas del mismo color. Cada jugador tiene un alfil de casillas blancas y otro de casillas negras.',
            movement: 'El alfil se mueve cualquier número de casillas en diagonal, siempre que no haya piezas en el camino.',
            value: 'Un alfil vale aproximadamente 3 puntos.',
            examples: [
              {
                position: [
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, { type: 'bishop', color: 'white' }, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null]
                ],
                moves: [
                  { row: 3, col: 2 },
                  { row: 2, col: 1 },
                  { row: 1, col: 0 },
                  { row: 3, col: 4 },
                  { row: 2, col: 5 },
                  { row: 1, col: 6 },
                  { row: 0, col: 7 },
                  { row: 5, col: 2 },
                  { row: 6, col: 1 },
                  { row: 7, col: 0 },
                  { row: 5, col: 4 },
                  { row: 6, col: 5 },
                  { row: 7, col: 6 }
                ],
                description: 'El alfil se mueve en diagonal cualquier número de casillas.'
              }
            ],
            strategies: [
              {
                name: 'Par de alfiles',
                description: 'Tener ambos alfiles (de casillas blancas y negras) es una ventaja, especialmente en posiciones abiertas.'
              },
              {
                name: 'Fianchetto',
                description: 'Desarrollar el alfil en b2 o g2 (para las blancas) o b7 o g7 (para las negras) para controlar las diagonales largas.'
              },
              {
                name: 'Alfil malo',
                description: 'Un alfil cuya movilidad está limitada por sus propios peones se considera un "alfil malo".'
              }
            ]
          },
          rook: {
            name: 'Torre',
            image: '/assets/pieces/white_rook.svg',
            description: 'La torre es una pieza poderosa que se mueve en línea recta horizontal o verticalmente. Es especialmente fuerte en el final de la partida.',
            movement: 'La torre se mueve cualquier número de casillas en horizontal o vertical, siempre que no haya piezas en el camino.',
            value: 'Una torre vale aproximadamente 5 puntos.',
            examples: [
              {
                position: [
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, { type: 'rook', color: 'white' }, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null]
                ],
                moves: [
                  { row: 4, col: 0 },
                  { row: 4, col: 1 },
                  { row: 4, col: 2 },
                  { row: 4, col: 4 },
                  { row: 4, col: 5 },
                  { row: 4, col: 6 },
                  { row: 4, col: 7 },
                  { row: 0, col: 3 },
                  { row: 1, col: 3 },
                  { row: 2, col: 3 },
                  { row: 3, col: 3 },
                  { row: 5, col: 3 },
                  { row: 6, col: 3 },
                  { row: 7, col: 3 }
                ],
                description: 'La torre se mueve en horizontal o vertical cualquier número de casillas.'
              }
            ],
            strategies: [
              {
                name: 'Torres en columnas abiertas',
                description: 'Colocar torres en columnas sin peones para maximizar su movilidad y control.'
              },
              {
                name: 'Doblar torres',
                description: 'Colocar dos torres en la misma columna o fila para aumentar su poder.'
              },
              {
                name: 'Torre en séptima',
                description: 'Una torre en la séptima fila (para las blancas) o segunda fila (para las negras) puede ser muy poderosa, atacando peones y restringiendo al rey enemigo.'
              }
            ]
          },
          queen: {
            name: 'Reina',
            image: '/assets/pieces/white_queen.svg',
            description: 'La reina es la pieza más poderosa del ajedrez, combinando los movimientos de la torre y el alfil.',
            movement: 'La reina se mueve cualquier número de casillas en horizontal, vertical o diagonal, siempre que no haya piezas en el camino.',
            value: 'Una reina vale aproximadamente 9 puntos.',
            examples: [
              {
                position: [
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, { type: 'queen', color: 'white' }, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null]
                ],
                moves: [
                  // Movimientos horizontales y verticales (como la torre)
                  { row: 4, col: 0 },
                  { row: 4, col: 1 },
                  { row: 4, col: 2 },
                  { row: 4, col: 4 },
                  { row: 4, col: 5 },
                  { row: 4, col: 6 },
                  { row: 4, col: 7 },
                  { row: 0, col: 3 },
                  { row: 1, col: 3 },
                  { row: 2, col: 3 },
                  { row: 3, col: 3 },
                  { row: 5, col: 3 },
                  { row: 6, col: 3 },
                  { row: 7, col: 3 },
                  // Movimientos diagonales (como el alfil)
                  { row: 3, col: 2 },
                  { row: 2, col: 1 },
                  { row: 1, col: 0 },
                  { row: 3, col: 4 },
                  { row: 2, col: 5 },
                  { row: 1, col: 6 },
                  { row: 0, col: 7 },
                  { row: 5, col: 2 },
                  { row: 6, col: 1 },
                  { row: 7, col: 0 },
                  { row: 5, col: 4 },
                  { row: 6, col: 5 },
                  { row: 7, col: 6 }
                ],
                description: 'La reina combina los movimientos de la torre y el alfil, lo que la convierte en la pieza más poderosa.'
              }
            ],
            strategies: [
              {
                name: 'Desarrollo de la reina',
                description: 'No desarrollar la reina demasiado pronto, ya que puede ser atacada por piezas menores y forzada a retroceder.'
              },
              {
                name: 'Ataques con la reina',
                description: 'La reina es excelente para ataques directos al rey, especialmente cuando está apoyada por otras piezas.'
              },
              {
                name: 'Cambio de reinas',
                description: 'Cambiar reinas puede ser ventajoso cuando se tiene ventaja material o desventajoso cuando se está atacando.'
              }
            ]
          },
          king: {
            name: 'Rey',
            image: '/assets/pieces/white_king.svg',
            description: 'El rey es la pieza más importante del ajedrez. Si el rey está en jaque mate, la partida termina. Proteger al rey es fundamental.',
            movement: 'El rey se mueve una casilla en cualquier dirección (horizontal, vertical o diagonal).',
            specialRules: 'Enroque: Un movimiento especial que permite mover el rey dos casillas hacia la torre y luego colocar la torre al otro lado del rey. Solo se puede hacer si ni el rey ni la torre se han movido, no hay piezas entre ellos, el rey no está en jaque y no pasa por casillas atacadas.',
            value: 'El rey no tiene un valor numérico, ya que no puede ser capturado.',
            examples: [
              {
                position: [
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, { type: 'king', color: 'white' }, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null]
                ],
                moves: [
                  { row: 3, col: 2 },
                  { row: 3, col: 3 },
                  { row: 3, col: 4 },
                  { row: 4, col: 2 },
                  { row: 4, col: 4 },
                  { row: 5, col: 2 },
                  { row: 5, col: 3 },
                  { row: 5, col: 4 }
                ],
                description: 'El rey se mueve una casilla en cualquier dirección.'
              },
              {
                position: [
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [{ type: 'rook', color: 'white' }, null, null, null, { type: 'king', color: 'white' }, null, null, { type: 'rook', color: 'white' }]
                ],
                moves: [
                  { row: 7, col: 2 },
                  { row: 7, col: 6 }
                ],
                description: 'Enroque: El rey puede moverse dos casillas hacia la torre y la torre se coloca al otro lado del rey.'
              }
            ],
            strategies: [
              {
                name: 'Seguridad del rey',
                description: 'Enrocar pronto para proteger al rey y conectar las torres.'
              },
              {
                name: 'Rey activo en el final',
                description: 'En el final de la partida, el rey debe activarse y participar en la lucha.'
              },
              {
                name: 'Oposición',
                description: 'En finales de rey y peón, la oposición (reyes enfrentados con una casilla de separación) es un concepto clave.'
              }
            ]
          }
        };
        
        // Verificar si existe información para la pieza solicitada
        if (piecesData[pieceId]) {
          setPieceInfo(piecesData[pieceId]);
        } else {
          setError(`No se encontró información para la pieza: ${pieceId}`);
        }
      } catch (err) {
        setError('Error al cargar la información de la pieza');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPieceInfo();
  }, [pieceId]);

  return { pieceInfo, loading, error };
} 