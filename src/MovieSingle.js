import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieSingle() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const apiKey = '52447b48ae6be33b0ece8b4960fb974e'; // Replace 'YOUR_API_KEY' with your actual TMDB API key
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
      setMovie(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Movie Single</h2>
      <p style={idStyle}>Movie ID: {id}</p>
      {movie ? (
        <div style={movieDetailsStyle}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={posterStyle} />
          <div>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            {/* Add more movie details here */}
          </div>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
}

export default MovieSingle;

// Inline styles
const containerStyle = {
  margin: '20px', width: '555px'
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const idStyle = {
  fontWeight: 'bold',
};

const movieDetailsStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '20px',
};

const posterStyle = {
  width: '200px',
  marginRight: '20px',
};
