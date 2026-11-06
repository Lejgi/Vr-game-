#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "InteractableActor.generated.h"

class UStaticMeshComponent;

UENUM(BlueprintType)
enum class EInteractableKind : uint8
{
	Generic UMETA(DisplayName = "Obecný"),
	Ticket UMETA(DisplayName = "Jízdenka"),
	Lantern UMETA(DisplayName = "Lucerna"),
	Luggage UMETA(DisplayName = "Zavazadlo")
};

/**
 * Základní uchopitelný předmět ve vagónu.
 */
UCLASS()
class NOCNISPOJ_API AInteractableActor : public AActor
{
	GENERATED_BODY()

public:
	AInteractableActor();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj")
	virtual void OnGrabbed(USceneComponent* AttachParent);

	UFUNCTION(BlueprintCallable, Category = "Noční spoj")
	virtual void OnReleased();

	UFUNCTION(BlueprintPure, Category = "Noční spoj")
	bool IsHeld() const { return bIsHeld; }

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj")
	EInteractableKind Kind = EInteractableKind::Generic;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj")
	FText DisplayName;

protected:
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<UStaticMeshComponent> Mesh;

	UPROPERTY(BlueprintReadOnly, Category = "Noční spoj")
	bool bIsHeld = false;
};
