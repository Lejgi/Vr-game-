import { seedStore } from "./store.js";

const force = process.argv.includes("--force");

const recipes = await seedStore({ forceBuiltin: force });
console.log(`Seed hotov: ${recipes.length} receptů (force=${force})`);
for (const r of recipes) {
  console.log(` - ${r.title} [${r.slug}]`);
}
