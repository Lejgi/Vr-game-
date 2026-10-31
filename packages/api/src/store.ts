import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Recipe } from "@kucharka/shared";
import { recipeSchema } from "./schema.js";
import { recipesDir, storePath } from "./paths.js";

interface StoreFile {
  recipes: Recipe[];
}

async function readStoreFile(): Promise<StoreFile> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    return JSON.parse(raw) as StoreFile;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") {
      return { recipes: [] };
    }
    throw err;
  }
}

async function writeStoreFile(store: StoreFile): Promise<void> {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2) + "\n", "utf8");
}

export async function loadBuiltinRecipes(): Promise<Recipe[]> {
  const indexRaw = await fs.readFile(path.join(recipesDir, "index.json"), "utf8");
  const index = JSON.parse(indexRaw) as { recipes: string[] };
  const recipes: Recipe[] = [];

  for (const file of index.recipes) {
    const raw = await fs.readFile(path.join(recipesDir, file), "utf8");
    const parsed = recipeSchema.parse(JSON.parse(raw));
    recipes.push({ ...parsed, builtin: true });
  }

  return recipes;
}

/** Naplní store vestavěnými recepty; existující non-builtin ponechá. */
export async function seedStore(options: { forceBuiltin?: boolean } = {}): Promise<Recipe[]> {
  const builtin = await loadBuiltinRecipes();
  const current = await readStoreFile();
  const custom = current.recipes.filter((r) => !r.builtin);

  const byId = new Map<string, Recipe>();
  for (const r of builtin) {
    byId.set(r.id, r);
  }

  if (!options.forceBuiltin) {
    for (const r of current.recipes) {
      if (r.builtin && byId.has(r.id)) {
        // ponech upravený builtin, pokud už je ve store a force není zapnuté
        byId.set(r.id, r);
      }
    }
  }

  for (const r of custom) {
    byId.set(r.id, r);
  }

  const recipes = [...byId.values()].sort((a, b) => a.title.localeCompare(b.title, "cs"));
  await writeStoreFile({ recipes });
  return recipes;
}

export async function listRecipes(): Promise<Recipe[]> {
  const store = await readStoreFile();
  if (store.recipes.length === 0) {
    return seedStore({ forceBuiltin: true });
  }
  return store.recipes.sort((a, b) => a.title.localeCompare(b.title, "cs"));
}

export async function getRecipe(idOrSlug: string): Promise<Recipe | undefined> {
  const recipes = await listRecipes();
  return recipes.find((r) => r.id === idOrSlug || r.slug === idOrSlug);
}

export async function recipesUpdatedSince(sinceIso?: string): Promise<Recipe[]> {
  const recipes = await listRecipes();
  if (!sinceIso) return recipes;
  const since = Date.parse(sinceIso);
  if (Number.isNaN(since)) return recipes;
  return recipes.filter((r) => Date.parse(r.updatedAt) > since);
}

export async function createRecipe(
  input: Omit<Recipe, "id" | "updatedAt" | "builtin">,
): Promise<Recipe> {
  const store = await readStoreFile();
  if (store.recipes.length === 0) {
    await seedStore({ forceBuiltin: true });
  }
  const fresh = await readStoreFile();

  if (fresh.recipes.some((r) => r.slug === input.slug)) {
    const err = new Error("Recept se stejným slug už existuje");
    (err as Error & { status: number }).status = 409;
    throw err;
  }

  const recipe: Recipe = {
    ...input,
    id: `usr-${randomUUID()}`,
    updatedAt: new Date().toISOString(),
    builtin: false,
  };

  fresh.recipes.push(recipe);
  await writeStoreFile(fresh);
  return recipe;
}

export async function updateRecipe(
  idOrSlug: string,
  patch: Partial<Omit<Recipe, "id" | "builtin">>,
): Promise<Recipe | undefined> {
  const store = await readStoreFile();
  const idx = store.recipes.findIndex((r) => r.id === idOrSlug || r.slug === idOrSlug);
  if (idx < 0) return undefined;

  if (patch.slug && store.recipes.some((r, i) => i !== idx && r.slug === patch.slug)) {
    const err = new Error("Recept se stejným slug už existuje");
    (err as Error & { status: number }).status = 409;
    throw err;
  }

  const updated: Recipe = {
    ...store.recipes[idx],
    ...patch,
    id: store.recipes[idx].id,
    builtin: store.recipes[idx].builtin,
    updatedAt: new Date().toISOString(),
  };

  store.recipes[idx] = updated;
  await writeStoreFile(store);
  return updated;
}

export async function deleteRecipe(idOrSlug: string): Promise<boolean> {
  const store = await readStoreFile();
  const idx = store.recipes.findIndex((r) => r.id === idOrSlug || r.slug === idOrSlug);
  if (idx < 0) return false;

  if (store.recipes[idx].builtin) {
    const err = new Error("Vestavěné recepty nelze smazat");
    (err as Error & { status: number }).status = 400;
    throw err;
  }

  store.recipes.splice(idx, 1);
  await writeStoreFile(store);
  return true;
}
