import type { Ingredient } from "./types";

export function formatAmount(ing: Ingredient): string {
  if (ing.amount === null) return ing.unit;
  const amount =
    Number.isInteger(ing.amount) ? String(ing.amount) : String(ing.amount).replace(".", ",");
  return `${amount} ${ing.unit}`;
}

export function formatMinutes(total: number): string {
  if (total < 60) return `${total} min`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
