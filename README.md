# Kuchařka MR (Quest 2)

Mixed-reality **kuchařský pomocník** pro Meta Quest 2: vidíš reálnou kuchyni (passthrough) a ve vzduchu český recept s kroky a timerem.

Není to hra — žádné skóre ani virtuální sporák.

## Co je v repu

| Cesta | Obsah |
|-------|--------|
| `data/recipes/` | 10 klasických CZ receptů (zdroj pravdy offline) |
| `data/offline/recipes.json` | Bundle pro Quest/Unity (generovaný) |
| `packages/shared` | TypeScript typy receptů |
| `packages/api` | Online API + sync + seed |
| `docs/unity-quest.md` | Návod pro Unity klienta |

## Rychlý start (API)

```bash
npm install
npm run build
node scripts/bundle-offline.mjs
npm run dev
```

API: [http://localhost:8787](http://localhost:8787)

- `GET /api/recipes` — seznam  
- `GET /api/recipes/svickova` — detail  
- `GET /api/recipes/sync?since=…` — změny pro offline cache  

## Vestavěné recepty

Svíčková, guláš, řízek, bramborák, palačinky, česnečka, kulajda, vepřo-knedlo-zelo, ovocné knedlíky, bábovka.

## Offline + online

1. Quest app vždy načte `data/offline/recipes.json` (nebo sync cache).  
2. Při síti stáhne `GET /api/recipes/sync` a sloučí podle `updatedAt`.  
3. Vlastní recepty: `POST /api/recipes` (nejsou `builtin`).

## PC verze (vyzkoušet hned)

Desktopová appka s recepty, režimem vaření a timery:

```bash
npm install
npm run dev:pc          # prohlížeč na http://localhost:5173
npm run dist:win        # Windows ZIP s Kucharka.exe → packages/desktop/release/
```

**Windows:** rozbal `Kucharka-0.1.0-Windows.zip` a spusť `Kucharka.exe`.  
**Rychlý náhled bez Electronu:** `npm run dev:pc` v prohlížeči.

## Další kroky

- Unity scéna: passthrough + world-space UI (viz `docs/unity-quest.md`)
- Hand tracking / velké CTA „Další krok“
- Volitelně hlasové ovládání
