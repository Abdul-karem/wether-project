import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  },);

  const fetchMovies = async () => {
    try {
      const apiKey = '52447b48ae6be33b0ece8b4960fb974e'; // Replace 'YOUR_API_KEY' with your actual TMDB API key
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Movie List</h2>
      <ul style={listStyle}>
        {movies.map((movie) => (
          <li key={movie.id} style={movieItemStyle}>
            <Link to={`/movies/${movie.id}`} style={linkStyle}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} style={posterStyle} />
              <span>{movie.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Inline styles
const containerStyle = {
  margin: '20px',
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const listStyle = {
  listStyleType: 'none',
  padding: '0',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '10px'

};

const movieItemStyle = {
  marginBottom: '10px',
  width: '150px'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const posterStyle = {
  width: '150px',
  marginRight: '10px',
};

export default MovieList;
