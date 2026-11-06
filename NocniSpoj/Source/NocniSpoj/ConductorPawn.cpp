#include "ConductorPawn.h"
#include "InteractableActor.h"
#include "Camera/CameraComponent.h"
#include "Components/SphereComponent.h"
#include "MotionControllerComponent.h"
#include "NocniSpoj.h"

AConductorPawn::AConductorPawn()
{
	PrimaryActorTick.bCanEverTick = true;

	VROrigin = CreateDefaultSubobject<USceneComponent>(TEXT("VROrigin"));
	RootComponent = VROrigin;

	HeadCamera = CreateDefaultSubobject<UCameraComponent>(TEXT("HeadCamera"));
	HeadCamera->SetupAttachment(VROrigin);

	LeftController = CreateDefaultSubobject<UMotionControllerComponent>(TEXT("LeftController"));
	LeftController->SetupAttachment(VROrigin);
	LeftController->SetTrackingMotionSource(FName("Left"));

	RightController = CreateDefaultSubobject<UMotionControllerComponent>(TEXT("RightController"));
	RightController->SetupAttachment(VROrigin);
	RightController->SetTrackingMotionSource(FName("Right"));

	LeftGrabSphere = CreateDefaultSubobject<USphereComponent>(TEXT("LeftGrabSphere"));
	LeftGrabSphere->SetupAttachment(LeftController);
	LeftGrabSphere->SetSphereRadius(12.f);
	LeftGrabSphere->SetCollisionProfileName(TEXT("OverlapAllDynamic"));

	RightGrabSphere = CreateDefaultSubobject<USphereComponent>(TEXT("RightGrabSphere"));
	RightGrabSphere->SetupAttachment(RightController);
	RightGrabSphere->SetSphereRadius(12.f);
	RightGrabSphere->SetCollisionProfileName(TEXT("OverlapAllDynamic"));
}

void AConductorPawn::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);
	// Enhanced Input bindingy doplní BP_ConductorPawn / IMC_VR v editoru.
}

void AConductorPawn::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}

void AConductorPawn::TryGrabLeft()
{
	GrabWith(LeftGrabSphere, HeldLeft, LeftController);
}

void AConductorPawn::TryGrabRight()
{
	GrabWith(RightGrabSphere, HeldRight, RightController);
}

void AConductorPawn::ReleaseLeft()
{
	ReleaseHeld(HeldLeft);
}

void AConductorPawn::ReleaseRight()
{
	ReleaseHeld(HeldRight);
}

void AConductorPawn::TeleportTo(FVector WorldLocation)
{
	const FVector Origin = GetActorLocation();
	if (FVector::Dist(Origin, WorldLocation) > TeleportMaxDistance)
	{
		UE_LOG(LogNocniSpoj, Verbose, TEXT("Teleport mimo dosah."));
		return;
	}

	SetActorLocation(WorldLocation);
}

AInteractableActor* AConductorPawn::FindInteractable(USphereComponent* GrabSphere) const
{
	if (!GrabSphere)
	{
		return nullptr;
	}

	TArray<AActor*> Overlapping;
	GrabSphere->GetOverlappingActors(Overlapping, AInteractableActor::StaticClass());

	AInteractableActor* Best = nullptr;
	float BestDistSq = TNumericLimits<float>::Max();
	const FVector Center = GrabSphere->GetComponentLocation();

	for (AActor* Actor : Overlapping)
	{
		AInteractableActor* Item = Cast<AInteractableActor>(Actor);
		if (!Item || Item->IsHeld())
		{
			continue;
		}
		const float DistSq = FVector::DistSquared(Center, Item->GetActorLocation());
		if (DistSq < BestDistSq)
		{
			BestDistSq = DistSq;
			Best = Item;
		}
	}
	return Best;
}

void AConductorPawn::GrabWith(USphereComponent* GrabSphere, TObjectPtr<AInteractableActor>& HeldSlot, USceneComponent* AttachParent)
{
	if (HeldSlot)
	{
		return;
	}

	AInteractableActor* Item = FindInteractable(GrabSphere);
	if (!Item)
	{
		return;
	}

	Item->OnGrabbed(AttachParent);
	HeldSlot = Item;
}

void AConductorPawn::ReleaseHeld(TObjectPtr<AInteractableActor>& HeldSlot)
{
	if (!HeldSlot)
	{
		return;
	}

	HeldSlot->OnReleased();
	HeldSlot = nullptr;
}
