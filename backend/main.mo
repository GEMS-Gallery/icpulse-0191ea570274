import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor {
  // Stable variable to store recipes
  stable var recipes : [Recipe] = [];

  // Recipe type definition
  type Recipe = {
    id: Nat;
    title: Text;
    ingredients: [Text];
    instructions: Text;
    rating: Float;
  };

  // Function to add a new recipe
  public func addRecipe(title: Text, ingredients: [Text], instructions: Text) : async Nat {
    let id = recipes.size();
    let newRecipe : Recipe = {
      id = id;
      title = title;
      ingredients = ingredients;
      instructions = instructions;
      rating = 0.0;
    };
    recipes := Array.append(recipes, [newRecipe]);
    id
  };

  // Function to get all recipes
  public query func getAllRecipes() : async [Recipe] {
    recipes
  };

  // Function to get a specific recipe by ID
  public query func getRecipe(id: Nat) : async ?Recipe {
    if (id < recipes.size()) {
      ?recipes[id]
    } else {
      null
    }
  };

  // Function to rate a recipe
  public func rateRecipe(id: Nat, newRating: Float) : async Bool {
    if (id >= recipes.size()) {
      return false;
    };
    let recipe = recipes[id];
    let updatedRecipe = {
      id = recipe.id;
      title = recipe.title;
      ingredients = recipe.ingredients;
      instructions = recipe.instructions;
      rating = (recipe.rating + newRating) / 2.0; // Simple average
    };
    recipes := Array.tabulate(recipes.size(), func (i: Nat) : Recipe {
      if (i == id) { updatedRecipe } else { recipes[i] }
    });
    true
  };

  // Function to search recipes by ingredient
  public query func searchByIngredient(ingredient: Text) : async [Recipe] {
    Array.filter(recipes, func (recipe: Recipe) : Bool {
      Array.find(recipe.ingredients, func (ing: Text) : Bool {
        ing == ingredient
      }) != null
    })
  };
}
