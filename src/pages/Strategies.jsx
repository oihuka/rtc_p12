import { useState, useEffect } from 'react';
import StrategyCard from '../components/StrategyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useChessStrategies } from '../hooks/useChessStrategies';
import '../styles/Strategies.css';

function Strategies() {
  const [filter, setFilter] = useState('all');
  const { strategies, loading, error } = useChessStrategies();
  const [filteredStrategies, setFilteredStrategies] = useState([]);

  useEffect(() => {
    if (strategies.length > 0) {
      if (filter === 'all') {
        setFilteredStrategies(strategies);
      } else {
        setFilteredStrategies(strategies.filter(strategy => 
          strategy.category === filter
        ));
      }
    }
  }, [strategies, filter]);

  if (loading) return <LoadingSpinner message="Cargando estrategias..." />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="strategies-page">
      <div className="strategies-header">
        <h1>Estrategias de Ajedrez</h1>
        <p>Explora estrategias clásicas y modernas para mejorar tu juego</p>
      </div>

      <div className="filter-controls">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button 
          className={filter === 'opening' ? 'active' : ''} 
          onClick={() => setFilter('opening')}
        >
          Aperturas
        </button>
        <button 
          className={filter === 'middlegame' ? 'active' : ''} 
          onClick={() => setFilter('middlegame')}
        >
          Medio juego
        </button>
        <button 
          className={filter === 'endgame' ? 'active' : ''} 
          onClick={() => setFilter('endgame')}
        >
          Finales
        </button>
        <button 
          className={filter === 'tactics' ? 'active' : ''} 
          onClick={() => setFilter('tactics')}
        >
          Tácticas
        </button>
      </div>

      <div className="strategies-container">
        {filteredStrategies.length > 0 ? (
          filteredStrategies.map(strategy => (
            <StrategyCard 
              key={strategy.id} 
              strategy={strategy} 
            />
          ))
        ) : (
          <p className="no-results">No se encontraron estrategias para esta categoría.</p>
        )}
      </div>
    </div>
  );
}

export default Strategies; 