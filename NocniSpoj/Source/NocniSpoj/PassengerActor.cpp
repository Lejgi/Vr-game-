#include "PassengerActor.h"
#include "Components/SkeletalMeshComponent.h"
#include "NocniSpoj.h"

APassengerActor::APassengerActor()
{
	PrimaryActorTick.bCanEverTick = false;

	Root = CreateDefaultSubobject<USceneComponent>(TEXT("Root"));
	RootComponent = Root;

	BodyMesh = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("BodyMesh"));
	BodyMesh->SetupAttachment(Root);
}

void APassengerActor::ApplyDecision(EPassengerDecision Decision)
{
	LastDecision = Decision;
	UE_LOG(LogNocniSpoj, Log, TEXT("Cestující %s — rozhodnutí %d"),
		*PassengerId.ToString(), static_cast<int32>(Decision));

	if (Decision == EPassengerDecision::MakeExit)
	{
		SetActorHiddenInGame(true);
		SetActorEnableCollision(false);
	}
}
