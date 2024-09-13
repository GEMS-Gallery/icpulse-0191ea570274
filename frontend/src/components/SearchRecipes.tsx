import React, { useState } from 'react';
import { TextField, Button, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { backend } from 'declarations/backend';

interface Recipe {
  id: bigint;
  title: string;
  rating: number;
}

const SearchRecipes: React.FC = () => {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await backend.searchByIngredient(ingredient);
      setRecipes(result.map(recipe => ({
        ...recipe,
        id: Number(recipe.id),
        rating: Number(recipe.rating)
      })));
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Search Recipes by Ingredient
      </Typography>
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
        <TextField
          label="Ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" disabled={loading} sx={{ ml: 2 }}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </Box>
      <List>
        {recipes.map((recipe) => (
          <ListItem key={Number(recipe.id)} component={Link} to={`/recipe/${recipe.id}`}>
            <ListItemText 
              primary={recipe.title} 
              secondary={`Rating: ${recipe.rating.toFixed(1)}`} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchRecipes;
