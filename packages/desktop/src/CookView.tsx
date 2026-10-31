import { useEffect, useMemo, useState } from "react";
import { formatAmount, formatTimer } from "./format";
import type { Recipe } from "./types";

interface Props {
  recipe: Recipe;
  onExit: () => void;
  onDone: (completedSteps: number, usedTimers: number) => void;
}

export function CookView({ recipe, onExit, onDone }: Props) {
  const steps = useMemo(
    () => [...recipe.steps].sort((a, b) => a.order - b.order),
    [recipe.steps],
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [usedTimers, setUsedTimers] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);

  const step = steps[stepIndex];
  const progress = ((stepIndex + 1) / steps.length) * 100;

  useEffect(() => {
    setRemaining(step?.timerSeconds ?? null);
    setRunning(false);
  }, [stepIndex, step?.timerSeconds]);

  useEffect(() => {
    if (!running || remaining === null) return;
    if (remaining <= 0) {
      setRunning(false);
      return;
    }
    const id = window.setInterval(() => {
      setRemaining((value) => (value === null ? value : Math.max(0, value - 1)));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, remaining]);

  function toggleIngredient(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function finishStep() {
    setCompletedSteps((n) => n + 1);
    if (stepIndex >= steps.length - 1) {
      onDone(completedSteps + 1, usedTimers);
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function startTimer() {
    if (remaining === null) return;
    if (!running) setUsedTimers((n) => n + 1);
    setRunning(true);
  }

  return (
    <div className="cook-shell">
      <div className="progress-row">
        <button type="button" className="btn btn-ghost" onClick={onExit}>
          Ukončit
        </button>
        <div className="bar" aria-hidden>
          <i style={{ width: `${progress}%` }} />
        </div>
        <span>
          Krok {stepIndex + 1}/{steps.length}
        </span>
      </div>

      <p className="eyebrow">{recipe.title}</p>
      <h2 className="cook-title">Vaříme</h2>
      <p className="step-text">{step.text}</p>

      {step.timerSeconds ? (
        <div className="timer-box">
          <div>
            <div className="eyebrow">Timer</div>
            <strong>{formatTimer(remaining ?? step.timerSeconds)}</strong>
          </div>
          <div className="actions">
            {!running ? (
              <button type="button" className="btn btn-primary" onClick={startTimer}>
                Spustit
              </button>
            ) : (
              <button type="button" className="btn btn-ghost" onClick={() => setRunning(false)}>
                Pauza
              </button>
            )}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setRunning(false);
                setRemaining(step.timerSeconds ?? null);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      ) : null}

      <p className="eyebrow">Suroviny (odškrtávej)</p>
      <ul className="checklist">
        {recipe.ingredients.map((ing) => {
          const key = `${ing.name}|${ing.amount}|${ing.unit}`;
          const done = Boolean(checked[key]);
          return (
            <li key={key}>
              <label className={done ? "done" : undefined}>
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => toggleIngredient(key)}
                />
                <span>
                  {ing.name} — {formatAmount(ing)}
                  {ing.note ? ` (${ing.note})` : ""}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="actions">
        <button
          type="button"
          className="btn btn-ghost"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
        >
          Předchozí
        </button>
        <button type="button" className="btn btn-primary" onClick={finishStep}>
          {stepIndex >= steps.length - 1 ? "Hotovo" : "Další krok"}
        </button>
      </div>
    </div>
  );
}
