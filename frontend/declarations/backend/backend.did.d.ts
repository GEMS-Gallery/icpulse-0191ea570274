import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Recipe {
  'id' : bigint,
  'title' : string,
  'instructions' : string,
  'rating' : number,
  'ingredients' : Array<string>,
}
export interface _SERVICE {
  'addRecipe' : ActorMethod<[string, Array<string>, string], bigint>,
  'getAllRecipes' : ActorMethod<[], Array<Recipe>>,
  'getRecipe' : ActorMethod<[bigint], [] | [Recipe]>,
  'rateRecipe' : ActorMethod<[bigint, number], boolean>,
  'searchByIngredient' : ActorMethod<[string], Array<Recipe>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
