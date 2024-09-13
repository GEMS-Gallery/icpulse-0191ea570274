import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, TextField, Button, Box } from '@mui/material';
import { backend } from 'declarations/backend';

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string;
  rating: number;
}

interface RecipeDetailsProps {
  recipes: Recipe[];
  onRateRecipe: () => void;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipes, onRateRecipe }) => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find(r => r.id === Number(id));
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);

  if (!recipe) {
    return <Typography>Recipe not found</Typography>;
  }

  const handleRating = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await backend.rateRecipe(BigInt(recipe.id), parseFloat(rating));
      onRateRecipe();
      setRating('');
    } catch (error) {
      console.error('Error rating recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {recipe.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Ingredients:
      </Typography>
      <List>
        {recipe.ingredients.map((ingredient, index) => (
          <ListItem key={index}>
            <ListItemText primary={ingredient} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Instructions:
      </Typography>
      <Typography paragraph>{recipe.instructions}</Typography>
      <Typography variant="h6" gutterBottom>
        Rating: {recipe.rating.toFixed(1)}
      </Typography>
      <Box component="form" onSubmit={handleRating} sx={{ mt: 2 }}>
        <TextField
          label="Your Rating (0-5)"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          inputProps={{ min: 0, max: 5, step: 0.1 }}
          required
        />
        <Button type="submit" variant="contained" disabled={loading} sx={{ ml: 2 }}>
          {loading ? 'Rating...' : 'Rate Recipe'}
        </Button>
      </Box>
    </Box>
  );
};

export default RecipeDetails;
