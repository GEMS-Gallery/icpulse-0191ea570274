import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';
import SearchRecipes from './components/SearchRecipes';

interface Recipe {
  id: bigint;
  title: string;
  ingredients: string[];
  instructions: string;
  rating: number;
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const result = await backend.getAllRecipes();
      setRecipes(result.map(recipe => ({
        ...recipe,
        id: Number(recipe.id),
        rating: Number(recipe.rating)
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe Book
          </Typography>
          <Link to="/" style={{ color: 'white', marginRight: '20px' }}>Home</Link>
          <Link to="/add" style={{ color: 'white', marginRight: '20px' }}>Add Recipe</Link>
          <Link to="/search" style={{ color: 'white' }}>Search</Link>
        </Toolbar>
      </AppBar>
      <Container>
        {loading ? (
          <CircularProgress style={{ marginTop: '20px' }} />
        ) : (
          <Routes>
            <Route path="/" element={<RecipeList recipes={recipes} />} />
            <Route path="/add" element={<AddRecipe onAddRecipe={fetchRecipes} />} />
            <Route path="/recipe/:id" element={<RecipeDetails recipes={recipes} onRateRecipe={fetchRecipes} />} />
            <Route path="/search" element={<SearchRecipes />} />
          </Routes>
        )}
      </Container>
    </div>
  );
}

export default App;
