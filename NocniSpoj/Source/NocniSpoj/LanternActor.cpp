#include "LanternActor.h"
#include "Components/PointLightComponent.h"

ALanternActor::ALanternActor()
{
	Kind = EInteractableKind::Lantern;
	DisplayName = NSLOCTEXT("NocniSpoj", "LanternDefault", "Lucerna");

	FlameLight = CreateDefaultSubobject<UPointLightComponent>(TEXT("FlameLight"));
	FlameLight->SetupAttachment(Mesh);
	FlameLight->SetIntensity(0.f);
	FlameLight->SetLightColor(FLinearColor(1.f, 0.55f, 0.25f));
	FlameLight->SetAttenuationRadius(600.f);
}

void ALanternActor::SetLit(bool bLit)
{
	bIsLit = bLit;
	FlameLight->SetIntensity(bIsLit ? LitIntensity : 0.f);
}

void ALanternActor::OnGrabbed(USceneComponent* AttachParent)
{
	Super::OnGrabbed(AttachParent);
	SetLit(true);
}

void ALanternActor::OnReleased()
{
	Super::OnReleased();
	// Po puštění zůstane svítit — průvodčí ji může položit na stůl.
}
