/** Společný datový model receptů pro API i Quest/Unity klienta. */

export type IngredientUnit =
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "ks"
  | "lžíce"
  | "lžička"
  | "hrnek"
  | "špetka"
  | "dle chuti";

export interface Ingredient {
  /** Název suroviny v češtině */
  name: string;
  amount: number | null;
  unit: IngredientUnit | string;
  /** Volitelná poznámka (např. „na kostky“) */
  note?: string;
}

export interface RecipeStep {
  /** Pořadí od 1 */
  order: number;
  /** Text kroku zobrazený ve velkém panelu při vaření */
  text: string;
  /** Volitelný timer v sekundách (vaření, pečení, louhování) */
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
  /** ISO-8601 – pro sync offline ↔ online */
  updatedAt: string;
  /** true = vestavěný klasický recept (seed) */
  builtin?: boolean;
}

export interface RecipeSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  difficulty: RecipeDifficulty;
  tags: string[];
  updatedAt: string;
  builtin?: boolean;
}

export interface SyncResponse {
  recipes: Recipe[];
  serverTime: string;
}

export function toRecipeSummary(recipe: Recipe): RecipeSummary {
  const {
    id,
    slug,
    title,
    description,
    servings,
    prepMinutes,
    cookMinutes,
    difficulty,
    tags,
    updatedAt,
    builtin,
  } = recipe;
  return {
    id,
    slug,
    title,
    description,
    servings,
    prepMinutes,
    cookMinutes,
    difficulty,
    tags,
    updatedAt,
    builtin,
  };
}
