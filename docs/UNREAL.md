# Unreal Engine 5 — Noční spoj

## Požadavky

- **Unreal Engine 5.4+** (Epic Games Launcher)
- Windows doporučeno pro Quest Link / SteamVR
- Pro Quest build později: Meta XR plugin + Android SDK

> Tento cloud agent **nemá nainstalovaný Unreal Editor** — projekt je připravený ke zkompilování u tebe lokálně.

## Otevření projektu

1. Nainstaluj UE 5.4 (nebo změň `EngineAssociation` v `NocniSpoj.uproject`)
2. Double-click `NocniSpoj/NocniSpoj.uproject`
3. Nech přegenerovat Visual Studio / Rider project files
4. Build (Ctrl+Alt+F11) — modul `NocniSpoj`

## První hratelný krok v editoru (30–60 min)

1. Enable pluginy: **OpenXR**, **OpenXRHandTracking**, **Enhanced Input** (už v `.uproject`)
2. Vytvoř mapu `Content/Maps/L_TrainPrototype` (viz `Content/Maps/README.md`)
3. Drag do levelu:
   - `TrainCarActor`
   - `LanternActor`
   - `TicketActor` (DestinationStopId = `Stop_Tumlov`)
   - `PassengerActor`
4. Play in VR Preview (nebo PIE s myší: LMB/RMB grab bindingy v `DefaultInput.ini`)
5. V konzoli hledej logy `LogNocniSpoj` — StopDirector startuje trať automaticky

## Co už je v C++

| Třída | Účel |
|-------|------|
| `ANocniSpojGameMode` | Spawnuje StopDirector, default pawn |
| `AConductorPawn` | VR origin + HMD + motion controllers + grab |
| `AInteractableActor` | Uchopitelné předměty |
| `ATicketActor` | Jízdenka + děrování |
| `ALanternActor` | Lucerna se světlem |
| `ATrainCarActor` | Vagón + dveře |
| `APassengerActor` | Cestující + rozhodnutí |
| `AStopDirector` | Fáze zastávky: příjezd → obchůzka → rozhodnutí → odjezd |

Data (CSV k importu do DataTable): `Content/Data/Stops.csv`, `Passengers.csv`

## Quest / Steam

- **SteamVR / PCVR:** OpenXR runtime (SteamVR)
- **Quest:** později Meta XR + packaging Android; stejný C++ kód, jiné packaging

## Další milník

BP child classy (`BP_Conductor`, `BP_Ticket`…) + mesh vagónu + 1 kompletní zastávka Tumlov.
