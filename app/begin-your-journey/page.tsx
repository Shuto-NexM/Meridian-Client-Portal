import Nav from '@/components/Nav';
import BeginHero from '@/components/BeginHero';
import BeginInvitation from '@/components/BeginInvitation';
import BeginForm from '@/components/BeginForm';
import BeginWhatHappensNext from '@/components/BeginWhatHappensNext';
import BeginAlternativeContact from '@/components/BeginAlternativeContact';
import BeginQuote from '@/components/BeginQuote';
import BeginConciergeReminder from '@/components/BeginConciergeReminder';
import Footer from '@/components/Footer';

export const metadata = { title: 'Begin Your Journey — Meridian Private Journeys' };

export default function BeginYourJourneyPage() {
  return (
    <>
      <Nav activePage="Begin" goldCta />
      <BeginHero />
      <BeginInvitation />
      <BeginForm />
      <BeginWhatHappensNext />
      <BeginAlternativeContact />
      <BeginQuote />
      <BeginConciergeReminder />
      <Footer />
    </>
  );
}
