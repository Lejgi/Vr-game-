#pragma once

#include "CoreMinimal.h"
#include "Engine/DataTable.h"
#include "StopTypes.generated.h"

UENUM(BlueprintType)
enum class EStopPhase : uint8
{
	Arriving UMETA(DisplayName = "Příjezd"),
	Inspection UMETA(DisplayName = "Obchůzka"),
	Decision UMETA(DisplayName = "Rozhodnutí"),
	Departing UMETA(DisplayName = "Odjezd"),
	Dawn UMETA(DisplayName = "Ráno / konec")
};

UENUM(BlueprintType)
enum class EPassengerDecision : uint8
{
	None UMETA(DisplayName = "Žádné"),
	KeepOnBoard UMETA(DisplayName = "Nechat ve vlaku"),
	MakeExit UMETA(DisplayName = "Vystoupit"),
	MoveCar UMETA(DisplayName = "Přesunout vagón")
};

/** Jeden řádek trati — DataTable / CSV. */
USTRUCT(BlueprintType)
struct FStopDefinition : public FTableRowBase
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	FName StopId;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	FText DisplayName;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	FText AtmosphereNote;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	float DurationSeconds = 600.f;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	TArray<FName> PassengerIds;
};
