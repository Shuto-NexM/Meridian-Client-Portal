import Nav from '@/components/Nav';
import WellnessHero from '@/components/WellnessHero';
import WellnessPhilosophy from '@/components/WellnessPhilosophy';
import WellnessJourneys from '@/components/WellnessJourneys';
import WellnessQualities from '@/components/WellnessQualities';
import WellnessFeatured from '@/components/WellnessFeatured';
import WellnessDay from '@/components/WellnessDay';
import WellnessRetreats from '@/components/WellnessRetreats';
import WellnessJournal from '@/components/WellnessJournal';
import WellnessConcierge from '@/components/WellnessConcierge';
import WellnessCta from '@/components/WellnessCta';
import Footer from '@/components/Footer';

export const metadata = { title: 'Wellness & Restoration — Meridian Private Journeys' };

export default function WellnessPage() {
  return (
    <>
      <Nav activePage="Wellness" />
      <WellnessHero />
      <WellnessPhilosophy />
      <WellnessJourneys />
      <WellnessQualities />
      <WellnessFeatured />
      <WellnessDay />
      <WellnessRetreats />
      <WellnessJournal />
      <WellnessConcierge />
      <WellnessCta />
      <Footer />
    </>
  );
}
