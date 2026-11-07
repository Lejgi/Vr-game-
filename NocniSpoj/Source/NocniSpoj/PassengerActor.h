#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "StopTypes.h"
#include "PassengerActor.generated.h"

class USkeletalMeshComponent;
class ATicketActor;

/**
 * Cestující — zatím jednoduchý actor (později Character + animace).
 */
UCLASS()
class NOCNISPOJ_API APassengerActor : public AActor
{
	GENERATED_BODY()

public:
	APassengerActor();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Cestující")
	void ApplyDecision(EPassengerDecision Decision);

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj|Cestující")
	FName PassengerId;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj|Cestující")
	FText DisplayName;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj|Cestující")
	FText WhisperLine;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj|Cestující")
	TObjectPtr<ATicketActor> LinkedTicket;

	UPROPERTY(BlueprintReadOnly, Category = "Noční spoj|Cestující")
	EPassengerDecision LastDecision = EPassengerDecision::None;

protected:
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<USceneComponent> Root;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	TObjectPtr<USkeletalMeshComponent> BodyMesh;
};
