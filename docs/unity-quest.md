# Quest 2 – Unity / MR klient

Cíl: **passthrough (IRL kuchyně) + plovoucí recept v češtině**.

## Doporučený stack

- Unity 2022.3 LTS (nebo 6 LTS)
- Meta XR SDK / OpenXR + Meta feature group
- Passthrough API (Quest 2 = grayscale)
- Unity UI Toolkit nebo World-space Canvas pro panely

## Offline + online

1. Do buildu zkopíruj `data/offline/recipes.json` (vygeneruj: `node scripts/bundle-offline.mjs`).
2. Při startu načti offline bundle → seznam receptů vždy funguje bez sítě.
3. Pokud je síť: `GET /api/recipes/sync?since=<posledníSync>` a merge podle `id` + `updatedAt`.
4. Uloženou cache drž lokálně (Application.persistentDataPath).

## Obrazovky MVP

1. **Seznam receptů** – název, čas, obtížnost  
2. **Detail** – suroviny + popis  
3. **Režim vaření** – velký aktuální krok, checklist, timer, Další / Zpět  
4. Panel kotvit v prostoru (u sporáku)

## API (výchozí)

```
GET  /health
GET  /api/recipes
GET  /api/recipes/:idOrSlug
GET  /api/recipes/sync?since=2026-01-01T00:00:00.000Z
POST /api/recipes
PATCH /api/recipes/:idOrSlug
```

Na headsetu v LAN: `http://<PC-IP>:8787`.

## Poznámka k Quest 2

Passthrough je černobílý. Text receptu musí být vysoce kontrastní (světlý panel, velké písmo).
