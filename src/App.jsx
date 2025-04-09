import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ChessBoard from './pages/ChessBoard';
import Strategies from './pages/Strategies';
import Learn from './pages/Learn';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<ChessBoard />} />
            <Route path="/strategies" element={<Strategies />} />
            <Route path="/learn/:pieceId" element={<Learn />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Chess Master - Aprende a jugar ajedrez</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
