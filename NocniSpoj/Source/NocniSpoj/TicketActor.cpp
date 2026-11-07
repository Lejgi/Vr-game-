#include "TicketActor.h"
#include "NocniSpoj.h"

ATicketActor::ATicketActor()
{
	Kind = EInteractableKind::Ticket;
	DisplayName = NSLOCTEXT("NocniSpoj", "TicketDefault", "Jízdenka");
}

void ATicketActor::PunchTicket()
{
	if (bIsPunched)
	{
		return;
	}

	bIsPunched = true;
	UE_LOG(LogNocniSpoj, Log, TEXT("Jízdenka děrována: %s → %s"),
		*PassengerName.ToString(), *DestinationStopId.ToString());
}

bool ATicketActor::MatchesStop(FName StopId) const
{
	return DestinationStopId == StopId;
}
