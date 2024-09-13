import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface Recipe {
  id: number;
  title: string;
  rating: number;
}

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Recipes
      </Typography>
      <List>
        {recipes.map((recipe) => (
          <ListItem key={recipe.id} component={Link} to={`/recipe/${recipe.id}`}>
            <ListItemText 
              primary={recipe.title} 
              secondary={`Rating: ${recipe.rating.toFixed(1)}`} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RecipeList;
