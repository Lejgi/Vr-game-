# PC Kuchařka (Windows)

Desktopová appka pro vyzkoušení receptů na PC (Electron).

## Rychlý náhled v prohlížeči

```bash
npm install
npm run dev:pc
```

Otevři http://localhost:5173

## Windows .exe

```bash
npm run dist:win
```

Výstup: `packages/desktop/release/Kucharka-0.1.0-Windows.zip`

1. Rozbal ZIP  
2. Spusť `Kucharka.exe`  
3. Vyber recept → **Začít vařit** → kroky + timery  

Poznámka: ZIP má cca 100+ MB (Electron runtime). Do Gitu se necommituje — vždy se sestaví lokálně.
