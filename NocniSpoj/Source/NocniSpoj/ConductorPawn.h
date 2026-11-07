#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Pawn.h"
#include "ConductorPawn.generated.h"

class UCameraComponent;
class UMotionControllerComponent;
class USphereComponent;
class AInteractableActor;

/**
 * VR pawn průvodčího — hlava (HMD) + levá/pravá ruka.
 * Grab přes overlap + input (Enhanced Input / Blueprint).
 */
UCLASS()
class NOCNISPOJ_API AConductorPawn : public APawn
{
	GENERATED_BODY()

public:
	AConductorPawn();

	virtual void SetupPlayerInputComponent(UInputComponent* PlayerInputComponent) override;
	virtual void Tick(float DeltaTime) override;

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Grab")
	void TryGrabLeft();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Grab")
	void TryGrabRight();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Grab")
	void ReleaseLeft();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Grab")
	void ReleaseRight();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Movement")
	void TeleportTo(FVector WorldLocation);

protected:
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<USceneComponent> VROrigin;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<UCameraComponent> HeadCamera;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<UMotionControllerComponent> LeftController;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<UMotionControllerComponent> RightController;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<USphereComponent> LeftGrabSphere;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<USphereComponent> RightGrabSphere;

	UPROPERTY(BlueprintReadOnly, Category = "Noční spoj|Grab")
	TObjectPtr<AInteractableActor> HeldLeft;

	UPROPERTY(BlueprintReadOnly, Category = "Noční spoj|Grab")
	TObjectPtr<AInteractableActor> HeldRight;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj|Movement")
	float TeleportMaxDistance = 800.f;

private:
	AInteractableActor* FindInteractable(USphereComponent* GrabSphere) const;
	void GrabWith(USphereComponent* GrabSphere, TObjectPtr<AInteractableActor>& HeldSlot, USceneComponent* AttachParent);
	void ReleaseHeld(TObjectPtr<AInteractableActor>& HeldSlot);
};
