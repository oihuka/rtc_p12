import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useReducer } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import MovieList from './components/MovieList';
import { movieReducer, initialState } from './reducers/movieReducer';
import './App.css'

function App() {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  const handleSearchResults = (results) => {
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
  };

  const handleResetSearch = () => {
    dispatch({ type: 'RESET_SEARCH' });
  };

  return (
    <Router>
      <Navbar onSearchResults={handleSearchResults} onReset={handleResetSearch} />
      <Routes>
        <Route 
          path="/" 
          element={
            state.searchResults ? (
              <MovieList movies={state.searchResults} />
            ) : (
              <Home state={state} dispatch={dispatch} />
            )
          } 
        />
        <Route 
          path="/movie/:id" 
          element={<MovieDetail state={state} dispatch={dispatch} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
