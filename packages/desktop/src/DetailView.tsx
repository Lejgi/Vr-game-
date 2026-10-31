import { formatAmount, formatMinutes } from "./format";
import type { Recipe } from "./types";

interface Props {
  recipe: Recipe;
  onBack: () => void;
  onCook: () => void;
}

export function DetailView({ recipe, onBack, onCook }: Props) {
  return (
    <>
      <header className="topbar">
        <h1 className="brand">
          <span>Recept</span>
          Kuchařka
        </h1>
        <div className="actions">
          <button type="button" className="btn btn-ghost" onClick={onBack}>
            Zpět na seznam
          </button>
        </div>
      </header>

      <div className="panel">
        <section className="hero-block">
          <p className="eyebrow">{recipe.tags.join(" · ")}</p>
          <h1>{recipe.title}</h1>
          <p className="lead">{recipe.description}</p>
          <div className="meta" style={{ marginBottom: 22 }}>
            <span className="chip accent">{recipe.difficulty}</span>
            <span className="chip">příprava {formatMinutes(recipe.prepMinutes)}</span>
            <span className="chip">vaření {formatMinutes(recipe.cookMinutes)}</span>
            <span className="chip">{recipe.servings} porce</span>
          </div>
          <div className="actions">
            <button type="button" className="btn btn-primary" onClick={onCook}>
              Začít vařit
            </button>
          </div>
        </section>

        <aside className="side-block">
          <h2>Suroviny</h2>
          <ul className="ingredients">
            {recipe.ingredients.map((ing) => (
              <li key={`${ing.name}-${ing.amount}-${ing.unit}`}>
                <div>
                  {ing.name}
                  {ing.note ? <span className="note">{ing.note}</span> : null}
                </div>
                <span>{formatAmount(ing)}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
