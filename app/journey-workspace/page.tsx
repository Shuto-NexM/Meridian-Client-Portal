import Nav from '@/components/Nav';
import WorkspaceSelector from '@/components/WorkspaceSelector';
import Footer from '@/components/Footer';

export const metadata = { title: 'Journey Workspace — Meridian Private Journeys' };

export default function WorkspaceSelectorPage() {
  return (
    <>
      <Nav activePage="Begin" goldCta />
      <WorkspaceSelector />
      <Footer />
    </>
  );
}
