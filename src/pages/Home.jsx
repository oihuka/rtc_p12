import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Bienvenido a Chess Master</h1>
        <p>Aprende a jugar ajedrez de forma interactiva y divertida</p>
        <div className="cta-buttons">
          <Link to="/play" className="cta-button primary">Jugar ahora</Link>
          <Link to="/learn/pawn" className="cta-button secondary">Aprender movimientos</Link>
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <h3>Juega contra la IA</h3>
          <p>Practica tus habilidades jugando contra nuestro motor de ajedrez inteligente</p>
        </div>
        <div className="feature-card">
          <h3>Aprende movimientos</h3>
          <p>Descubre cómo se mueve cada pieza y las reglas especiales del juego</p>
        </div>
        <div className="feature-card">
          <h3>Estrategias avanzadas</h3>
          <p>Explora estrategias clásicas y modernas para mejorar tu juego</p>
        </div>
      </div>
      
      <div className="getting-started">
        <h2>¿Cómo empezar?</h2>
        <ol>
          <li>Aprende los movimientos básicos de cada pieza</li>
          <li>Practica jugando partidas contra la IA</li>
          <li>Estudia estrategias comunes para mejorar tu juego</li>
          <li>Desarrolla tu propio estilo de juego</li>
        </ol>
      </div>
    </div>
  );
}

export default Home;
