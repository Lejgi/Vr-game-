#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "StopTypes.h"
#include "StopDirector.generated.h"

class UDataTable;
class ATrainCarActor;
class APassengerActor;

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnStopPhaseChanged, FName, StopId, EStopPhase, NewPhase);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnRouteFinished, bool, bReachedDawn);

/**
 * Řídí trať: příjezd → obchůzka → rozhodnutí → odjezd.
 * Data zastávek ber z DataTable (Content/Data/DT_Stops).
 */
UCLASS()
class NOCNISPOJ_API AStopDirector : public AActor
{
	GENERATED_BODY()

public:
	AStopDirector();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Trať")
	void BeginRoute();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Trať")
	void AdvancePhase();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Trať")
	void RecordDecision(FName PassengerId, EPassengerDecision Decision);

	UFUNCTION(BlueprintPure, Category = "Noční spoj|Trať")
	FName GetCurrentStopId() const;

	UFUNCTION(BlueprintPure, Category = "Noční spoj|Trať")
	EStopPhase GetCurrentPhase() const { return CurrentPhase; }

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj|Trať")
	TObjectPtr<UDataTable> StopsTable;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj|Trať")
	TArray<FName> StopOrder;

	UPROPERTY(BlueprintAssignable, Category = "Noční spoj|Trať")
	FOnStopPhaseChanged OnStopPhaseChanged;

	UPROPERTY(BlueprintAssignable, Category = "Noční spoj|Trať")
	FOnRouteFinished OnRouteFinished;

protected:
	virtual void BeginPlay() override;

	UPROPERTY(BlueprintReadOnly, Category = "Noční spoj|Trať")
	int32 CurrentStopIndex = INDEX_NONE;

	UPROPERTY(BlueprintReadOnly, Category = "Noční spoj|Trať")
	EStopPhase CurrentPhase = EStopPhase::Arriving;

	UPROPERTY(BlueprintReadOnly, Category = "Noční spoj|Trať")
	TMap<FName, EPassengerDecision> DecisionLog;

	void EnterPhase(EStopPhase Phase);
	void LoadFallbackStops();
	bool GetStopDef(FName StopId, FStopDefinition& OutDef) const;
};
