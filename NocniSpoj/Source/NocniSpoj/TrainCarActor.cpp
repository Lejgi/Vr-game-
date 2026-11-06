#include "TrainCarActor.h"
#include "Components/BoxComponent.h"
#include "Components/StaticMeshComponent.h"
#include "NocniSpoj.h"

ATrainCarActor::ATrainCarActor()
{
	PrimaryActorTick.bCanEverTick = false;

	Root = CreateDefaultSubobject<USceneComponent>(TEXT("Root"));
	RootComponent = Root;

	ShellMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("ShellMesh"));
	ShellMesh->SetupAttachment(Root);

	InteriorVolume = CreateDefaultSubobject<UBoxComponent>(TEXT("InteriorVolume"));
	InteriorVolume->SetupAttachment(Root);
	InteriorVolume->SetBoxExtent(FVector(600.f, 140.f, 140.f));
	InteriorVolume->SetCollisionProfileName(TEXT("OverlapAllDynamic"));

	DoorLeftSocket = CreateDefaultSubobject<USceneComponent>(TEXT("DoorLeftSocket"));
	DoorLeftSocket->SetupAttachment(Root);
	DoorLeftSocket->SetRelativeLocation(FVector(-580.f, -140.f, 0.f));

	DoorRightSocket = CreateDefaultSubobject<USceneComponent>(TEXT("DoorRightSocket"));
	DoorRightSocket->SetupAttachment(Root);
	DoorRightSocket->SetRelativeLocation(FVector(-580.f, 140.f, 0.f));
}

void ATrainCarActor::SetDoorsOpen(bool bOpen)
{
	bDoorsOpen = bOpen;
	UE_LOG(LogNocniSpoj, Log, TEXT("Vagón %s — dveře %s"),
		*CarId.ToString(), bOpen ? TEXT("otevřené") : TEXT("zavřené"));
}
