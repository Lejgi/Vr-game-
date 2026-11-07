#pragma once

#include "CoreMinimal.h"
#include "InteractableActor.h"
#include "TicketActor.generated.h"

/**
 * Jízdenka — děrování a porovnání se stanicí.
 */
UCLASS()
class NOCNISPOJ_API ATicketActor : public AInteractableActor
{
	GENERATED_BODY()

public:
	ATicketActor();

	UFUNCTION(BlueprintCallable, Category = "Noční spoj|Jízdenka")
	void PunchTicket();

	UFUNCTION(BlueprintPure, Category = "Noční spoj|Jízdenka")
	bool MatchesStop(FName StopId) const;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj|Jízdenka")
	FName DestinationStopId;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Noční spoj|Jízdenka")
	FText PassengerName;

	UPROPERTY(BlueprintReadOnly, Category = "Noční spoj|Jízdenka")
	bool bIsPunched = false;
};
