import { formatMinutes } from "./format";
import type { Recipe } from "./types";

interface Props {
  recipes: Recipe[];
  onOpen: (id: string) => void;
}

export function HomeView({ recipes, onOpen }: Props) {
  return (
    <>
      <header className="topbar">
        <h1 className="brand">
          <span>České recepty</span>
          Kuchařka
        </h1>
        <p className="tagline">
          Vyber recept a vař krok za krokem — s timery přímo u sporáku.
        </p>
      </header>

      <div className="grid">
        {recipes.map((recipe, index) => (
          <button
            key={recipe.id}
            type="button"
            className="card"
            style={{ animationDelay: `${index * 40}ms` }}
            onClick={() => onOpen(recipe.id)}
          >
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <div className="meta">
              <span className="chip accent">{recipe.difficulty}</span>
              <span className="chip">
                {formatMinutes(recipe.prepMinutes + recipe.cookMinutes)}
              </span>
              <span className="chip">{recipe.servings} porce</span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
