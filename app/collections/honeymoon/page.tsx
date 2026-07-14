import Nav from '@/components/Nav';
import HoneymoonHero from '@/components/HoneymoonHero';
import HoneymoonPhilosophy from '@/components/HoneymoonPhilosophy';
import HoneymoonJourneys from '@/components/HoneymoonJourneys';
import HoneymoonQualities from '@/components/HoneymoonQualities';
import HoneymoonFeatured from '@/components/HoneymoonFeatured';
import HoneymoonDay from '@/components/HoneymoonDay';
import HoneymoonJournal from '@/components/HoneymoonJournal';
import HoneymoonConcierge from '@/components/HoneymoonConcierge';
import HoneymoonCta from '@/components/HoneymoonCta';
import Footer from '@/components/Footer';

export const metadata = { title: 'Honeymoon — Meridian Private Journeys' };

export default function HoneymoonPage() {
  return (
    <>
      <Nav activePage="Honeymoon" />
      <HoneymoonHero />
      <HoneymoonPhilosophy />
      <HoneymoonJourneys />
      <HoneymoonQualities />
      <HoneymoonFeatured />
      <HoneymoonDay />
      <HoneymoonJournal />
      <HoneymoonConcierge />
      <HoneymoonCta />
      <Footer />
    </>
  );
}
