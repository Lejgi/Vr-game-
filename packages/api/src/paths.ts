import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/** Kořen monorepa (…/packages/api/src → ../../..) */
export const repoRoot = path.resolve(here, "../../..");

export const recipesDir = path.join(repoRoot, "data", "recipes");
export const storePath = path.join(repoRoot, "data", "store.json");
