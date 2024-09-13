import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import { backend } from 'declarations/backend';

interface AddRecipeProps {
  onAddRecipe: () => void;
}

const AddRecipe: React.FC<AddRecipeProps> = ({ onAddRecipe }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await backend.addRecipe(title, ingredients.split(','), instructions);
      onAddRecipe();
      navigate('/');
    } catch (error) {
      console.error('Error adding recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add New Recipe
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 2 }}>
        {loading ? 'Adding...' : 'Add Recipe'}
      </Button>
    </Box>
  );
};

export default AddRecipe;
