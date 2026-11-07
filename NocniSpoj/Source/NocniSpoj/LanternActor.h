#pragma once

#include "CoreMinimal.h"
#include "InteractableActor.h"
#include "LanternActor.generated.h"

class UPointLightComponent;

/**
 * Lucerna — světlo odhalí skryté stopy ve vagónu.
 */
UCLASS()
class NOCNISPOJ_API ALanternActor : public AInteractableActor
{
	GENERATED_BODY()

public:
	ALanternActor();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Lucerna")
	void SetLit(bool bLit);

	UFUNCTION(BlueprintPure, Category = "Noční spoj|Lucerna")
	bool IsLit() const { return bIsLit; }

	virtual void OnGrabbed(USceneComponent* AttachParent) override;
	virtual void OnReleased() override;

protected:
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<UPointLightComponent> FlameLight;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj|Lucerna")
	float LitIntensity = 3500.f;

	UPROPERTY(BlueprintReadOnly, Category = "Noční spoj|Lucerna")
	bool bIsLit = false;
};
