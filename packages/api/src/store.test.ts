import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import { after, before, describe, it } from "node:test";
import path from "node:path";
import { storePath } from "./paths.js";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  listRecipes,
  recipesUpdatedSince,
  seedStore,
} from "./store.js";

const backupPath = `${storePath}.test-backup`;

describe("recipe store", () => {
  before(async () => {
    try {
      await fs.copyFile(storePath, backupPath);
    } catch {
      // no existing store
    }
    await fs.rm(storePath, { force: true });
  });

  after(async () => {
    await fs.rm(storePath, { force: true });
    try {
      await fs.rename(backupPath, storePath);
    } catch {
      // no backup
    }
  });

  it("načte 10 vestavěných receptů", async () => {
    const recipes = await seedStore({ forceBuiltin: true });
    assert.equal(recipes.length, 10);
    const svickova = await getRecipe("svickova");
    assert.ok(svickova);
    assert.equal(svickova.title, "Svíčková na smetaně");
    assert.ok(svickova.steps.length >= 5);
  });

  it("listRecipes vrací seřazený seznam", async () => {
    const list = await listRecipes();
    assert.equal(list.length, 10);
    const titles = list.map((r) => r.title);
    const sorted = [...titles].sort((a, b) => a.localeCompare(b, "cs"));
    assert.deepEqual(titles, sorted);
  });

  it("umožní vytvořit a smazat vlastní recept", async () => {
    const created = await createRecipe({
      slug: "testovaci-polevka",
      title: "Testovací polévka",
      description: "Jen pro test",
      servings: 2,
      prepMinutes: 5,
      cookMinutes: 10,
      difficulty: "snadný",
      tags: ["test"],
      ingredients: [{ name: "voda", amount: 1, unit: "l" }],
      steps: [{ order: 1, text: "Povař vodu." }],
    });
    assert.equal(created.builtin, false);
    assert.ok(created.id.startsWith("usr-"));

    const found = await getRecipe("testovaci-polevka");
    assert.ok(found);

    const deleted = await deleteRecipe(created.id);
    assert.equal(deleted, true);
    assert.equal(await getRecipe(created.id), undefined);
  });

  it("nesmaže vestavěný recept", async () => {
    await assert.rejects(() => deleteRecipe("gulas"), /Vestavěné/);
  });

  it("sync filtruje podle since", async () => {
    const all = await recipesUpdatedSince();
    assert.ok(all.length >= 10);
    const future = await recipesUpdatedSince("2099-01-01T00:00:00.000Z");
    assert.equal(future.length, 0);
  });
});

describe("paths", () => {
  it("recipesDir ukazuje na data/recipes", async () => {
    const { recipesDir } = await import("./paths.js");
    const index = path.join(recipesDir, "index.json");
    await fs.access(index);
  });
});
