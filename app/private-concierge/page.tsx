import Nav from '@/components/Nav';
import ConciergeHero from '@/components/ConciergeHero';
import ConciergePhilosophy from '@/components/ConciergePhilosophy';
import ConciergeHowWeWork from '@/components/ConciergeHowWeWork';
import ConciergeWhatWeConsider from '@/components/ConciergeWhatWeConsider';
import ConciergeMeetConcierge from '@/components/ConciergeMeetConcierge';
import ConciergeFaq from '@/components/ConciergeFaq';
import ConciergeCta from '@/components/ConciergeCta';
import Footer from '@/components/Footer';

export const metadata = { title: 'Private Concierge — Meridian Private Journeys' };

export default function PrivateConciergePage() {
  return (
    <>
      <Nav activePage="Concierge" />
      <ConciergeHero />
      <ConciergePhilosophy />
      <ConciergeHowWeWork />
      <ConciergeWhatWeConsider />
      <ConciergeMeetConcierge />
      <ConciergeFaq />
      <ConciergeCta />
      <Footer />
    </>
  );
}
