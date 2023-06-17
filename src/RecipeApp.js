import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php', {
          params: {
            s: searchTerm, // Pass the search term here
          },
        });
        setRecipes(response.data.meals || []); // Provide an empty array as the default value
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.strMeal &&
    recipe.strInstructions &&
    recipe.strMealThumb &&
    recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Recipe App</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: '0.5rem', textAlign: 'center', margin: '5px auto' }}
      />

      <ul style={{ listStyle: 'none' , display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px'}}>
        {filteredRecipes.length === 0 ? (
          <li style={{ textAlign: 'center', width: '100%' }}>
            <p>No recipe found</p>
          </li>
        ) : (
          filteredRecipes.map((recipe) => (
            <li key={recipe.idMeal} style={{ marginBottom: '1rem', width: '300px' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{recipe.strMeal}</h3>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100%', marginBottom: '0.5rem' }} />
              <p style={{ height: '250px', overflow: 'auto' }}>{recipe.strInstructions}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecipeApp;
