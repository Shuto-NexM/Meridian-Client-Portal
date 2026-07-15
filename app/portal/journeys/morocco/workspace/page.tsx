'use client';
import PlanningWorkspace from '@/components/portal/PlanningWorkspace';

export default function MoroccoWorkspace() {
  return (
    <PlanningWorkspace
      title="Morocco"
      subtitle="Marrakech & Atlas · Winter 2026"
      stage="Awaiting Review"
      nights={10}
      destinations={['Marrakech', 'Atlas Mountains']}
      updated="5 Jul 2026"
      sofiaNote="Your Morocco proposal is ready for review. I've put together an itinerary that moves between the medina's riads and a private Atlas mountain camp — please review and let me know your thoughts."
      journeyId="morocco"
    />
  );
}
