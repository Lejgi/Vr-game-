#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "NocniSpojGameMode.generated.h"

class AStopDirector;

/**
 * Výchozí GameMode pro Noční spoj.
 * Spawnuje VR průvodčího a řídí režim zastávek přes StopDirector.
 */
UCLASS()
class NOCNISPOJ_API ANocniSpojGameMode : public AGameModeBase
{
	GENERATED_BODY()

public:
	ANocniSpojGameMode();

	virtual void StartPlay() override;

	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Noční spoj")
	TSubclassOf<AStopDirector> StopDirectorClass;

	UPROPERTY(BlueprintReadOnly, Category = "Noční spoj")
	TObjectPtr<AStopDirector> ActiveStopDirector;
};
