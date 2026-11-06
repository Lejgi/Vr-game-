#include "InteractableActor.h"
#include "Components/StaticMeshComponent.h"

AInteractableActor::AInteractableActor()
{
	PrimaryActorTick.bCanEverTick = false;

	Mesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
	RootComponent = Mesh;
	Mesh->SetSimulatePhysics(true);
	Mesh->SetCollisionProfileName(TEXT("PhysicsActor"));
	Mesh->SetGenerateOverlapEvents(true);
}

void AInteractableActor::OnGrabbed(USceneComponent* AttachParent)
{
	if (!AttachParent)
	{
		return;
	}

	bIsHeld = true;
	Mesh->SetSimulatePhysics(false);
	Mesh->SetCollisionEnabled(ECollisionEnabled::NoCollision);
	AttachToComponent(AttachParent, FAttachmentTransformRules::SnapToTargetNotIncludingScale);
}

void AInteractableActor::OnReleased()
{
	bIsHeld = false;
	DetachFromActor(FDetachmentTransformRules::KeepWorldTransform);
	Mesh->SetCollisionEnabled(ECollisionEnabled::QueryAndPhysics);
	Mesh->SetSimulatePhysics(true);
}
