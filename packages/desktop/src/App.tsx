import { useEffect, useMemo, useState } from "react";
import { CookView } from "./CookView";
import { DoneView } from "./DoneView";
import { HomeView } from "./HomeView";
import { DetailView } from "./DetailView";
import type { Recipe, RecipeBundle, Screen } from "./types";

export function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [screen, setScreen] = useState<Screen>({ name: "home" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("./recipes.json");
        if (!res.ok) throw new Error(`Nepodařilo se načíst recepty (${res.status})`);
        const data = (await res.json()) as RecipeBundle;
        if (!cancelled) setRecipes(data.recipes);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Chyba načítání");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = useMemo(() => {
    if (screen.name === "home") return undefined;
    return recipes.find((r) => r.id === screen.recipeId);
  }, [recipes, screen]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!recipes.length) {
    return <div className="loading">Načítám české recepty…</div>;
  }

  return (
    <div className="app">
      {screen.name === "home" && (
        <HomeView
          recipes={recipes}
          onOpen={(id) => setScreen({ name: "detail", recipeId: id })}
        />
      )}

      {screen.name === "detail" && selected && (
        <DetailView
          recipe={selected}
          onBack={() => setScreen({ name: "home" })}
          onCook={() => setScreen({ name: "cook", recipeId: selected.id })}
        />
      )}

      {screen.name === "cook" && selected && (
        <CookView
          recipe={selected}
          onExit={() => setScreen({ name: "detail", recipeId: selected.id })}
          onDone={(completedSteps, usedTimers) =>
            setScreen({
              name: "done",
              recipeId: selected.id,
              completedSteps,
              usedTimers,
            })
          }
        />
      )}

      {screen.name === "done" && selected && (
        <DoneView
          recipe={selected}
          completedSteps={screen.completedSteps}
          usedTimers={screen.usedTimers}
          onHome={() => setScreen({ name: "home" })}
          onAgain={() => setScreen({ name: "cook", recipeId: selected.id })}
        />
      )}
    </div>
  );
}
