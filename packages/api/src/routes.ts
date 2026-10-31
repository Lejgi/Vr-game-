import { Router } from "express";
import { toRecipeSummary, type SyncResponse } from "@kucharka/shared";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  listRecipes,
  recipesUpdatedSince,
  seedStore,
  updateRecipe,
} from "./store.js";
import { recipeCreateSchema, recipeUpdateSchema } from "./schema.js";

export const recipesRouter = Router();

recipesRouter.get("/", async (_req, res, next) => {
  try {
    const recipes = await listRecipes();
    res.json({
      count: recipes.length,
      recipes: recipes.map(toRecipeSummary),
    });
  } catch (err) {
    next(err);
  }
});

recipesRouter.get("/sync", async (req, res, next) => {
  try {
    const since = typeof req.query.since === "string" ? req.query.since : undefined;
    const recipes = await recipesUpdatedSince(since);
    const body: SyncResponse = {
      recipes,
      serverTime: new Date().toISOString(),
    };
    res.json(body);
  } catch (err) {
    next(err);
  }
});

recipesRouter.post("/admin/reseed", async (req, res, next) => {
  try {
    const force = req.query.force === "1" || req.query.force === "true";
    const recipes = await seedStore({ forceBuiltin: force });
    res.json({ count: recipes.length, force });
  } catch (err) {
    next(err);
  }
});

recipesRouter.get("/:idOrSlug", async (req, res, next) => {
  try {
    const recipe = await getRecipe(req.params.idOrSlug);
    if (!recipe) {
      res.status(404).json({ error: "Recept nenalezen" });
      return;
    }
    res.json(recipe);
  } catch (err) {
    next(err);
  }
});

recipesRouter.post("/", async (req, res, next) => {
  try {
    const parsed = recipeCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Neplatná data", details: parsed.error.flatten() });
      return;
    }
    const recipe = await createRecipe(parsed.data);
    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
});

recipesRouter.patch("/:idOrSlug", async (req, res, next) => {
  try {
    const parsed = recipeUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Neplatná data", details: parsed.error.flatten() });
      return;
    }
    const recipe = await updateRecipe(req.params.idOrSlug, parsed.data);
    if (!recipe) {
      res.status(404).json({ error: "Recept nenalezen" });
      return;
    }
    res.json(recipe);
  } catch (err) {
    next(err);
  }
});

recipesRouter.delete("/:idOrSlug", async (req, res, next) => {
  try {
    const ok = await deleteRecipe(req.params.idOrSlug);
    if (!ok) {
      res.status(404).json({ error: "Recept nenalezen" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
