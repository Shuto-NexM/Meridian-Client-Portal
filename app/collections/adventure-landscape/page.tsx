import Nav from '@/components/Nav';
import AdventureHero from '@/components/AdventureHero';
import AdventurePhilosophy from '@/components/AdventurePhilosophy';
import AdventureJourneys from '@/components/AdventureJourneys';
import AdventureQualities from '@/components/AdventureQualities';
import AdventureFeatured from '@/components/AdventureFeatured';
import AdventureDay from '@/components/AdventureDay';
import AdventureJournal from '@/components/AdventureJournal';
import AdventureConcierge from '@/components/AdventureConcierge';
import AdventureCta from '@/components/AdventureCta';
import Footer from '@/components/Footer';

export const metadata = { title: 'Adventure & Landscape — Meridian Private Journeys' };

export default function AdventureLandscapePage() {
  return (
    <>
      <Nav activePage="Adventure & Landscape" />
      <AdventureHero />
      <AdventurePhilosophy />
      <AdventureJourneys />
      <AdventureQualities />
      <AdventureFeatured />
      <AdventureDay />
      <AdventureJournal />
      <AdventureConcierge />
      <AdventureCta />
      <Footer />
    </>
  );
}
