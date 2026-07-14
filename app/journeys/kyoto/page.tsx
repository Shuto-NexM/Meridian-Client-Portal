import Nav from '@/components/Nav';
import JourneyDetailHero from '@/components/JourneyDetailHero';
import JourneyDetailPhilosophy from '@/components/JourneyDetailPhilosophy';
import JourneyDetailOverview from '@/components/JourneyDetailOverview';
import JourneyDetailTimeline from '@/components/JourneyDetailTimeline';
import JourneyDetailStays from '@/components/JourneyDetailStays';
import JourneyDetailQuiet from '@/components/JourneyDetailQuiet';
import JourneyDetailRelated from '@/components/JourneyDetailRelated';
import JourneyDetailCta from '@/components/JourneyDetailCta';
import Footer from '@/components/Footer';

export const metadata = { title: 'Before the Leaves Fall — Kyoto · Meridian Private Journeys' };

export default function KyotoJourneyPage() {
  return (
    <>
      <Nav activePage="Journeys" />
      <JourneyDetailHero />
      <JourneyDetailPhilosophy />
      <JourneyDetailOverview />
      <JourneyDetailTimeline />
      <JourneyDetailStays />
      <JourneyDetailQuiet />
      <JourneyDetailRelated />
      <JourneyDetailCta />
      <Footer />
    </>
  );
}
