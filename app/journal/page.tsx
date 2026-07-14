import Nav from '@/components/Nav';
import JournalHero from '@/components/JournalHero';
import JournalEditorsNote from '@/components/JournalEditorsNote';
import JournalFeatured from '@/components/JournalFeatured';
import JournalLatest from '@/components/JournalLatest';
import JournalThemes from '@/components/JournalThemes';
import JournalQuote from '@/components/JournalQuote';
import JournalConcierge from '@/components/JournalConcierge';
import Footer from '@/components/Footer';

export const metadata = { title: 'The Journal — Meridian Private Journeys' };

export default function JournalPage() {
  return (
    <>
      <Nav activePage="The Journal" lightMode />
      <JournalHero />
      <JournalEditorsNote />
      <JournalFeatured />
      <JournalLatest />
      <JournalThemes />
      <JournalQuote />
      <JournalConcierge />
      <Footer />
    </>
  );
}
