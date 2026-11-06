# Návrh hry: **Noční spoj**

> Solo VR · standing / room-scale · Meta Quest + SteamVR  
> Žánr: narativní interakce · magický realismus · lehká puzzle logika  
> Tone: teplé světlo, mlha, zvláštní klid — ne jump-scare horror

---

## Pitch (1 věta)

Jsi poslední průvodčí nočního vlaku, který oficiálně neexistuje — do rána musíš dovést divné cestující na správné zastávky, jinak se souprava i s tebou rozplyne.

---

## Proč právě VR

| VR moment | Proč to nejde stejně na monitoru |
|-----------|-----------------------------------|
| Procházení vagónem | Pocit délky, úzkosti chodeb, nahlížení mezi sedadla |
| Ruční práce | Děrování jízdenek, předávání zavazadel, zapalování lucerny |
| Prostorový zvuk | Šeptání za zády, rachot kolejí, vzdálené stanice |
| Měřítko | Obří nádražní hodiny, nízký strop lůžkového vozu |

---

## Hráčská smyčka (1 zastávka = 8–12 min)

1. **Příjezd** — vlak zastaví, otevřou se dveře, změní se atmosféra (světlo, zvuk, počasí za okny).
2. **Obchůzka** — projdeš 1–2 vagóny, vezmeš předměty, promluvíš / „poslechneš“ cestující.
3. **Anomálie** — najdeš 1 problém (špatná jízdenka, předmět z jiné doby, prázdné sedadlo co „dýchá“…).
4. **Rozhodnutí** — necháš / vystoupíš / přesuneš cestujícího nebo předmět.
5. **Odjezd** — vlak se přeskupí; tvé rozhodnutí změní další zastávku.

Žádné HP, žádné střílení. Tlak = čas do svítání + důsledky voleb.

---

## Svět a tón

- Stylizovaná střední Evropa: nádraží, mlha, smaltované cedule, dřevěné lavice.
- Cestující nejsou monstra — jsou to **příběhy v těle** (děti s jízdenkou na zrušenou trať, důchodkyně co hledá stanici z roku 1968, muž bez stínu…).
- Jazyk UI i dialogů: **čeština** (později EN).
- Reference atmosféry: *What Remains of Edith Finch* × *The Forgotten City* × český magický realismus — ale ve **vlaku a v rukou**.

---

## Postava a ovládání

- **Sólo**, standing (+ volitelně room-scale kolem „chodby“).
- Controllers (Quest / Index / …): grab, děrovačka, lucerna, ukazování.
- Pohyb: teleport + volitelný smooth (comfort options).
- Comfort first: žádné nucené otáčení vagónu, žádné VR rollercoaster efekty.

---

## Struktura obsahu (plán)

### Vertical slice (první hratelný kus)
- 1 souprava (2 vagóny + nástupiště)
- 3 zastávky
- 5 cestujících
- 1 finále rána (2 větve konce)

### Plná hra (cíl)
- ~6–8 zastávek
- ~12–15 cestujících
- 3 konce (všichni dojedou / někdo zmizí / vlak se stane legendou)
- Délka 60–90 min na run, replay kvůli jiným rozhodnutím

---

## Herní systémy (minimum)

1. **Jízdenky** — čteš, děruješ, porovnáváš se stanicí na ceduli.
2. **Předměty** — grab → prohlédnutí → položení na správné místo (sedadlo, schránka, schodiště).
3. **Lucerna** — světlo odhalí skryté stopy (nápisy, stíny, druhé vrstvy prostoru).
4. **Deník průvodčího** — krátké zápisy po zastávce (paměť rozhodnutí).
5. **Mapa trati** — lineární, ale odbočky se odemykají volbami.

---

## Umění & audio

- Low-poly / stylizovaný realismus, silné světlo a mlha (ne fotorealismus).
- Barevná paleta: uhelná čerň, mosaz, teplá žárovka, studená noční modř za okny.
- Audio: kolejový rytmus jako „heartbeat“, šeptané stanice, minimum hudby — spíš ambient.

---

## Tech návrh

| | |
|--|--|
| Engine | **Unreal Engine 5.4+** + OpenXR (Quest + SteamVR) |
| Jazyk | C++ (+ Blueprint pro polish) |
| Input | Enhanced Input + Motion Controllers |
| Projekt | `NocniSpoj/NocniSpoj.uproject` |
| Build | Quest (Meta XR) + SteamVR PC |
| Verze | Solo offline (žádný online nutný) |

Setup: viz [`docs/UNREAL.md`](UNREAL.md).

---

## Co záměrně není

- Multiplayer
- Combat / střílení
- Early-access live service
- Vaření / fitness / utility app

---

## Milníky

1. **Prototype** — prázdný vagón, grab, děrovačka, 1 NPC, 1 zastávka  
2. **Vertical slice** — 3 zastávky, 5 postav, 2 konce  
3. **Alpha** — celá trať bez polish  
4. **Beta** — comfort, dabing/texty, store buildy  
5. **Release** — Quest Store + Steam

---

## Rizika

| Riziko | Mitigace |
|--------|----------|
| Motion sickness v chodbě | Teleport default, vignette, sedící mód |
| „Jen chodím a poslouchám“ | Každá zastávka = jasný úkol s rukama |
| Scope creep postav | Vertical slice lockne počet NPC |
| Quest vs PC kvalita | Stejná logika, dvě LOD sady assetů |

---

## Úspěch vertical slice (kritéria)

Hráč za 20–30 minut:
- pochopí roli průvodčího,
- aspoň 3× použije ruce smysluplně (jízdenka / předmět / lucerna),
- udělá 1 rozhodnutí s viditelným důsledkem na další zastávce,
- chce vědět, „kam vlak jede dál“.
