import type { Recipe } from "./types";

interface Props {
  recipe: Recipe;
  completedSteps: number;
  usedTimers: number;
  onHome: () => void;
  onAgain: () => void;
}

function starsFor(recipe: Recipe, completedSteps: number, usedTimers: number): number {
  const stepRatio = completedSteps / Math.max(1, recipe.steps.length);
  const timerSteps = recipe.steps.filter((s) => s.timerSeconds).length;
  const timerBonus = timerSteps === 0 ? 1 : Math.min(1, usedTimers / timerSteps);
  const score = stepRatio * 0.75 + timerBonus * 0.25;
  if (score >= 0.9) return 3;
  if (score >= 0.6) return 2;
  return 1;
}

export function DoneView({ recipe, completedSteps, usedTimers, onHome, onAgain }: Props) {
  const stars = starsFor(recipe, completedSteps, usedTimers);

  return (
    <section className="hero-block done-panel">
      <p className="eyebrow">Dobrou chuť</p>
      <h1>{recipe.title}</h1>
      <div className="stars" aria-label={`${stars} z 3 hvězd`}>
        {"★".repeat(stars)}
        {"☆".repeat(3 - stars)}
      </div>
      <p className="lead" style={{ marginInline: "auto" }}>
        Prošel jsi {completedSteps} z {recipe.steps.length} kroků
        {usedTimers ? ` a použil ${usedTimers} timer${usedTimers > 1 ? "y" : ""}` : ""}.
      </p>
      <div className="actions" style={{ justifyContent: "center" }}>
        <button type="button" className="btn btn-primary" onClick={onAgain}>
          Vařit znovu
        </button>
        <button type="button" className="btn btn-ghost" onClick={onHome}>
          Další recept
        </button>
      </div>
    </section>
  );
}
