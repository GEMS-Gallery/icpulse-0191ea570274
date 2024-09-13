export const idlFactory = ({ IDL }) => {
  const Recipe = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'instructions' : IDL.Text,
    'rating' : IDL.Float64,
    'ingredients' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'addRecipe' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Text), IDL.Text],
        [IDL.Nat],
        [],
      ),
    'getAllRecipes' : IDL.Func([], [IDL.Vec(Recipe)], ['query']),
    'getRecipe' : IDL.Func([IDL.Nat], [IDL.Opt(Recipe)], ['query']),
    'rateRecipe' : IDL.Func([IDL.Nat, IDL.Float64], [IDL.Bool], []),
    'searchByIngredient' : IDL.Func([IDL.Text], [IDL.Vec(Recipe)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
