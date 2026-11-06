# Noční spoj

Solo **VR hra** (Unreal Engine 5) — jsi poslední průvodčí nočního vlaku, který oficiálně neexistuje.

## Rychlý start (Unreal)

1. Otevři [`NocniSpoj/NocniSpoj.uproject`](NocniSpoj/NocniSpoj.uproject) v **UE 5.4+**
2. Postup: [`docs/UNREAL.md`](docs/UNREAL.md)
3. Herní návrh: [`docs/NAVRH.md`](docs/NAVRH.md)

## Stav

| Vrstva | Stav |
|--------|------|
| Herní návrh | hotovo |
| UE5 C++ základ (pawn, grab, jízdenka, lucerna, trať) | hotovo |
| Mapa + meshe v Content | vytvoř v editoru (viz návod) |
| Quest / Steam build | později |

## Struktura

```
NocniSpoj/           ← Unreal projekt
  Source/NocniSpoj/  ← C++ gameplay
  Config/            ← GameMode, input, VR
  Content/Data/      ← CSV zastávky / cestující
docs/
  NAVRH.md
  UNREAL.md
```
