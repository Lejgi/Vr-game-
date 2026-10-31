import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1),
  amount: z.number().nullable(),
  unit: z.string().min(1),
  note: z.string().optional(),
});

export const stepSchema = z.object({
  order: z.number().int().positive(),
  text: z.string().min(1),
  timerSeconds: z.number().int().positive().optional(),
});

export const recipeSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  description: z.string(),
  servings: z.number().int().positive(),
  prepMinutes: z.number().int().nonnegative(),
  cookMinutes: z.number().int().nonnegative(),
  difficulty: z.enum(["snadný", "střední", "náročný"]),
  tags: z.array(z.string()),
  ingredients: z.array(ingredientSchema).min(1),
  steps: z.array(stepSchema).min(1),
  updatedAt: z.string().datetime(),
  builtin: z.boolean().optional(),
});

export const recipeCreateSchema = recipeSchema.omit({
  id: true,
  updatedAt: true,
  builtin: true,
});

export const recipeUpdateSchema = recipeCreateSchema.partial();
