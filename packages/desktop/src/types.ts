export type IngredientUnit = string;

export interface Ingredient {
  name: string;
  amount: number | null;
  unit: IngredientUnit;
  note?: string;
}

export interface RecipeStep {
  order: number;
  text: string;
  timerSeconds?: number;
}

export type RecipeDifficulty = "snadný" | "střední" | "náročný";

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  difficulty: RecipeDifficulty;
  tags: string[];
  ingredients: Ingredient[];
  steps: RecipeStep[];
  updatedAt: string;
  builtin?: boolean;
}

export interface RecipeBundle {
  version: number;
  locale: string;
  generatedAt: string;
  count: number;
  recipes: Recipe[];
}

export type Screen =
  | { name: "home" }
  | { name: "detail"; recipeId: string }
  | { name: "cook"; recipeId: string }
  | { name: "done"; recipeId: string; completedSteps: number; usedTimers: number };
