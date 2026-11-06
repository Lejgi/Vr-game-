#include "StopDirector.h"
#include "Engine/DataTable.h"
#include "NocniSpoj.h"

AStopDirector::AStopDirector()
{
	PrimaryActorTick.bCanEverTick = false;
}

void AStopDirector::BeginPlay()
{
	Super::BeginPlay();
}

void AStopDirector::BeginRoute()
{
	if (StopOrder.Num() == 0)
	{
		LoadFallbackStops();
	}

	CurrentStopIndex = 0;
	DecisionLog.Reset();
	EnterPhase(EStopPhase::Arriving);

	UE_LOG(LogNocniSpoj, Log, TEXT("Trať startuje na zastávce %s"), *GetCurrentStopId().ToString());
}

void AStopDirector::LoadFallbackStops()
{
	// Vertical slice bez DataTable v editoru — 3 zastávky z návrhu.
	StopOrder = {
		TEXT("Stop_Tumlov"),
		TEXT("Stop_CernaVoda"),
		TEXT("Stop_Rano")
	};
	UE_LOG(LogNocniSpoj, Warning, TEXT("StopsTable prázdná — používám fallback pořadí zastávek."));
}

FName AStopDirector::GetCurrentStopId() const
{
	if (!StopOrder.IsValidIndex(CurrentStopIndex))
	{
		return NAME_None;
	}
	return StopOrder[CurrentStopIndex];
}

bool AStopDirector::GetStopDef(FName StopId, FStopDefinition& OutDef) const
{
	if (!StopsTable)
	{
		return false;
	}

	const FString Context = TEXT("StopDirector");
	if (const FStopDefinition* Row = StopsTable->FindRow<FStopDefinition>(StopId, Context))
	{
		OutDef = *Row;
		return true;
	}
	return false;
}

void AStopDirector::EnterPhase(EStopPhase Phase)
{
	CurrentPhase = Phase;
	OnStopPhaseChanged.Broadcast(GetCurrentStopId(), CurrentPhase);
	UE_LOG(LogNocniSpoj, Log, TEXT("Fáze %d @ %s"), static_cast<int32>(Phase), *GetCurrentStopId().ToString());
}

void AStopDirector::AdvancePhase()
{
	switch (CurrentPhase)
	{
	case EStopPhase::Arriving:
		EnterPhase(EStopPhase::Inspection);
		break;
	case EStopPhase::Inspection:
		EnterPhase(EStopPhase::Decision);
		break;
	case EStopPhase::Decision:
		EnterPhase(EStopPhase::Departing);
		break;
	case EStopPhase::Departing:
		{
			const bool bLast = CurrentStopIndex >= StopOrder.Num() - 1;
			if (bLast)
			{
				EnterPhase(EStopPhase::Dawn);
				OnRouteFinished.Broadcast(true);
			}
			else
			{
				++CurrentStopIndex;
				EnterPhase(EStopPhase::Arriving);
			}
			break;
		}
	case EStopPhase::Dawn:
		break;
	}
}

void AStopDirector::RecordDecision(FName PassengerId, EPassengerDecision Decision)
{
	DecisionLog.Add(PassengerId, Decision);
	UE_LOG(LogNocniSpoj, Log, TEXT("Zápis rozhodnutí: %s → %d"),
		*PassengerId.ToString(), static_cast<int32>(Decision));
}
