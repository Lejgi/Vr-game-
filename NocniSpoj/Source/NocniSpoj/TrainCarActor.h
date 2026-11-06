#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "TrainCarActor.generated.h"

class UStaticMeshComponent;
class UBoxComponent;

/**
 * Jeden vagón — kolize podlahy/stěn + sockety pro sedadla/dveře.
 * V editoru nahraď mesh za vlastní asset vagónu.
 */
UCLASS()
class NOCNISPOJ_API ATrainCarActor : public AActor
{
	GENERATED_BODY()

public:
	ATrainCarActor();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Vagón")
	void SetDoorsOpen(bool bOpen);

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj|Vagón")
	FName CarId = TEXT("Car_A");

	UPROPERTY(BlueprintReadOnly, Category = "Noční spoj|Vagón")
	bool bDoorsOpen = false;

protected:
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<USceneComponent> Root;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<UStaticMeshComponent> ShellMesh;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<UBoxComponent> InteriorVolume;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<USceneComponent> DoorLeftSocket;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<USceneComponent> DoorRightSocket;
};
