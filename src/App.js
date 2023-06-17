import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WeatherApp from './WeatherApp';
import MovieList from './MovieList';
import MovieSingle from './MovieSingle';
import ContactList from './ContactList';
import RecipeApp from './RecipeApp';
import NotesApp from './NotesApp';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={navStyle}>
          <ul style={ulStyle}>
            <li style={liStyle}>
              <Link to="/" style={linkStyle}>Home</Link>
            </li>
            <li style={liStyle}>
              <Link to="/weather" style={linkStyle}>Weather</Link>
            </li>
            <li style={liStyle}>
              <Link to="/movies" style={linkStyle}>Movies</Link>
            </li>
            <li style={liStyle}>
              <Link to="/contact" style={linkStyle}>Contact</Link>
            </li>
            <li style={liStyle}>
              <Link to="/recipe" style={linkStyle}>Recipe</Link>
            </li>
            <li style={liStyle}>
              <Link to="/notes" style={linkStyle}>Notes</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/weather" element={<WeatherApp />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieSingle />} />
          <Route path="/contact" element={<ContactList />} />
          <Route path="/recipe" element={<RecipeApp />} />
          <Route path="/notes" element={<NotesApp />} />

        </Routes>

      </div>
    </Router>
  );
}


// Inline styles
const navStyle = {
  backgroundColor: '#f0f0f0',
  padding: '10px',
};

const ulStyle = {
  listStyleType: 'none',
  display: 'flex',
  justifyContent: 'center',
};

const liStyle = {
  margin: '0 10px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
};

export default App;
