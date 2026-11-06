#include "NocniSpojGameMode.h"
#include "ConductorPawn.h"
#include "StopDirector.h"
#include "NocniSpoj.h"

ANocniSpojGameMode::ANocniSpojGameMode()
{
	DefaultPawnClass = AConductorPawn::StaticClass();
	StopDirectorClass = AStopDirector::StaticClass();
}

void ANocniSpojGameMode::StartPlay()
{
	Super::StartPlay();

	if (StopDirectorClass)
	{
		FActorSpawnParameters Params;
		Params.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AlwaysSpawn;
		ActiveStopDirector = GetWorld()->SpawnActor<AStopDirector>(StopDirectorClass, Params);
		if (ActiveStopDirector)
		{
			ActiveStopDirector->BeginRoute();
			UE_LOG(LogNocniSpoj, Log, TEXT("StopDirector spuštěn — trať začíná."));
		}
	}
}
