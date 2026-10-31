#!/usr/bin/env node
/**
 * Složí data/offline/recipes.json – balíček pro Quest/Unity offline cache.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const recipesDir = path.join(root, "data", "recipes");
const outDir = path.join(root, "data", "offline");
const outFile = path.join(outDir, "recipes.json");

const index = JSON.parse(await fs.readFile(path.join(recipesDir, "index.json"), "utf8"));
const recipes = [];

for (const file of index.recipes) {
  const recipe = JSON.parse(await fs.readFile(path.join(recipesDir, file), "utf8"));
  recipes.push(recipe);
}

const bundle = {
  version: index.version,
  locale: index.locale,
  generatedAt: new Date().toISOString(),
  count: recipes.length,
  recipes,
};

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(outFile, JSON.stringify(bundle, null, 2) + "\n", "utf8");
console.log(`Offline bundle: ${outFile} (${recipes.length} receptů)`);
