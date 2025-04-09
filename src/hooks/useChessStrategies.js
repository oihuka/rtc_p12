import { useState, useEffect } from 'react';

export function useChessStrategies() {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStrategies = async () => {
      setLoading(true);
      
      try {
        // En una aplicación real, esto podría ser una llamada a una API
        // Aquí simulamos una carga de datos con un pequeño retraso
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Datos de ejemplo para estrategias de ajedrez
        const strategiesData = [
          {
            id: 'opening-1',
            name: 'Apertura Española (Ruy López)',
            category: 'opening',
            description: 'Una de las aperturas más antiguas y respetadas. Las blancas desarrollan piezas rápidamente y presionan el centro.',
            positions: [
              {
                board: [
                  [{ type: 'rook', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' }, { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }],
                  [{ type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, { type: 'pawn', color: 'white' }, null, null, null],
                  [null, null, null, null, null, { type: 'knight', color: 'white' }, null, null],
                  [{ type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, null, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }],
                  [{ type: 'rook', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' }, { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' }, null, { type: 'rook', color: 'white' }]
                ],
                highlightSquares: [
                  { row: 4, col: 4 },
                  { row: 5, col: 5 }
                ],
                description: '1.e4 e5 2.Nf3 - Las blancas controlan el centro y desarrollan el caballo.'
              },
              {
                board: [
                  [{ type: 'rook', color: 'black' }, null, { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' }, { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }],
                  [{ type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, null, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }],
                  [null, null, { type: 'knight', color: 'black' }, null, null, null, null, null],
                  [null, null, null, null, { type: 'pawn', color: 'black' }, null, null, null],
                  [null, null, null, null, { type: 'pawn', color: 'white' }, null, null, null],
                  [null, null, null, null, null, { type: 'knight', color: 'white' }, null, null],
                  [{ type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, null, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }],
                  [{ type: 'rook', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' }, { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' }, null, { type: 'rook', color: 'white' }]
                ],
                highlightSquares: [
                  { row: 2, col: 2 },
                  { row: 3, col: 4 }
                ],
                description: '2...Nc6 3.Bb5 - El alfil ataca el caballo que defiende el peón de e5.'
              }
            ],
            tips: [
              'Desarrolla tus piezas rápidamente hacia el centro',
              'Controla el centro con peones y piezas',
              'Enroca pronto para proteger al rey'
            ],
            advantages: 'Desarrollo rápido, control del centro, presión sobre el peón de e5.',
            disadvantages: 'Si las negras juegan correctamente, pueden igualar la posición.'
          },
          {
            id: 'opening-2',
            name: 'Defensa Siciliana',
            category: 'opening',
            description: 'Una defensa agresiva contra 1.e4. Las negras contraatacan en el flanco de dama en lugar de responder simétricamente.',
            positions: [
              {
                board: [
                  [{ type: 'rook', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' }, { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }],
                  [{ type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, null, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }],
                  [null, null, null, null, null, null, null, null],
                  [null, null, { type: 'pawn', color: 'black' }, null, null, null, null, null],
                  [null, null, null, null, { type: 'pawn', color: 'white' }, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [{ type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, null, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }],
                  [{ type: 'rook', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' }, { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'rook', color: 'white' }]
                ],
                highlightSquares: [
                  { row: 3, col: 2 }
                ],
                description: '1.e4 c5 - Las negras contraatacan en el flanco de dama.'
              }
            ],
            tips: [
              'Prepárate para posiciones desequilibradas y tácticas',
              'Las negras suelen jugar d6 y Nf6 para controlar e5',
              'Las blancas suelen jugar d4 para abrir el centro'
            ],
            advantages: 'Posiciones dinámicas y desequilibradas, buenas oportunidades de contraataque para las negras.',
            disadvantages: 'Posiciones complejas que requieren buen conocimiento teórico.'
          },
          {
            id: 'middlegame-1',
            name: 'Ataque al Rey Enrocado',
            category: 'middlegame',
            description: 'Estrategia para atacar al rey enemigo después del enroque. Implica sacrificios de piezas para abrir líneas de ataque.',
            positions: [
              {
                board: [
                  [{ type: 'rook', color: 'black' }, null, null, { type: 'queen', color: 'black' }, null, { type: 'rook', color: 'black' }, { type: 'king', color: 'black' }, null],
                  [{ type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, null, null, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }],
                  [null, null, { type: 'knight', color: 'black' }, { type: 'pawn', color: 'black' }, null, { type: 'knight', color: 'black' }, null, null],
                  [null, null, { type: 'bishop', color: 'black' }, null, { type: 'pawn', color: 'black' }, null, null, null],
                  [null, null, { type: 'bishop', color: 'white' }, null, { type: 'pawn', color: 'white' }, null, null, null],
                  [null, null, { type: 'knight', color: 'white' }, null, null, { type: 'knight', color: 'white' }, null, null],
                  [{ type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, null, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }],
                  [{ type: 'rook', color: 'white' }, null, null, { type: 'queen', color: 'white' }, null, { type: 'rook', color: 'white' }, { type: 'king', color: 'white' }, null]
                ],
                highlightSquares: [
                  { row: 1, col: 5 },
                  { row: 1, col: 6 },
                  { row: 0, col: 6 }
                ],
                description: 'El ataque se centra en los peones que protegen al rey enrocado.'
              }
            ],
            tips: [
              'Concentra tus piezas en el flanco donde el rey enemigo ha enrocado',
              'Busca sacrificios para abrir líneas de ataque',
              'Evita cambios de piezas atacantes'
            ],
            advantages: 'Puede llevar a un ataque decisivo y victoria rápida.',
            disadvantages: 'Si el ataque falla, puedes quedar con una posición debilitada.'
          },
          {
            id: 'endgame-1',
            name: 'Final de Rey y Peón',
            category: 'endgame',
            description: 'Técnicas para ganar o hacer tablas en finales con solo reyes y peones. La regla de la oposición y el cuadrado del peón son conceptos clave.',
            positions: [
              {
                board: [
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, { type: 'king', color: 'black' }, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, { type: 'king', color: 'white' }, null, null, null, null],
                  [null, null, null, null, { type: 'pawn', color: 'white' }, null, null, null],
                  [null, null, null, null, null, null, null, null]
                ],
                highlightSquares: [
                  { row: 3, col: 3 },
                  { row: 5, col: 3 },
                  { row: 6, col: 4 }
                ],
                description: 'La oposición: los reyes están separados por una casilla. El jugador que no tiene que mover tiene la oposición.'
              }
            ],
            tips: [
              'Activa tu rey en los finales',
              'Conoce la regla de la oposición',
              'Aprende el concepto del cuadrado del peón'
            ],
            advantages: 'Conocer bien los finales puede convertir muchas posiciones iguales en victorias.',
            disadvantages: 'Requiere precisión técnica y buen cálculo.'
          },
          {
            id: 'tactics-1',
            name: 'Horquilla de Caballo',
            category: 'tactics',
            description: 'Un caballo ataca simultáneamente dos o más piezas enemigas. Es una táctica muy común y efectiva.',
            positions: [
              {
                board: [
                  [null, null, null, null, { type: 'king', color: 'black' }, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, { type: 'queen', color: 'black' }, null, null, null],
                  [null, null, null, { type: 'knight', color: 'white' }, null, null, null, null],
                  [null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null]
                ],
                highlightSquares: [
                  { row: 5, col: 3 },
                  { row: 0, col: 4 },
                  { row: 4, col: 4 }
                ],
                description: 'El caballo ataca simultáneamente al rey y a la reina.'
              }
            ],
            tips: [
              'Busca posiciones donde tu caballo pueda atacar múltiples piezas',
              'Los mejores objetivos son el rey, la reina y las torres',
              'Crea amenazas que fuercen a las piezas enemigas a posiciones vulnerables'
            ],
            advantages: 'Puede ganar material o forzar movimientos desfavorables.',
            disadvantages: 'Jugadores experimentados suelen estar atentos a estas tácticas.'
          }
        ];
        
        setStrategies(strategiesData);
      } catch (err) {
        setError('Error al cargar las estrategias');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStrategies();
  }, []);

  return { strategies, loading, error };
} 