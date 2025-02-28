import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} MovieApp - Datos proporcionados por TMDB</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
