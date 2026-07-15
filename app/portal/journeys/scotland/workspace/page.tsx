'use client';
import PlanningWorkspace from '@/components/portal/PlanningWorkspace';

export default function ScotlandWorkspace() {
  return (
    <PlanningWorkspace
      title="Scotland"
      subtitle="Highlands & Skye · Spring 2027"
      stage="Planning"
      nights={8}
      destinations={['Highlands', 'Isle of Skye']}
      updated="9 Jul 2026"
      sofiaNote="I'm currently researching private estate stays in the Highlands and the best ferry routes to Skye that avoid the main tourist season. A proposal will be ready within the week."
    />
  );
}
