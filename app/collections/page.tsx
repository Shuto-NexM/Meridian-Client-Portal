import Nav from '@/components/Nav';
import CollectionsHero from '@/components/CollectionsHero';
import CollectionsIntro from '@/components/CollectionsIntro';
import CollectionCards from '@/components/CollectionCards';
import CollectionsGuide from '@/components/CollectionsGuide';
import CollectionsJournal from '@/components/CollectionsJournal';
import CollectionsConcierge from '@/components/CollectionsConcierge';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'The Collections — Meridian Private Journeys',
};

export default function CollectionsPage() {
  return (
    <>
      <Nav activePage="Collections" />
      <CollectionsHero />
      <CollectionsIntro />
      <CollectionCards />
      <CollectionsGuide />
      <CollectionsJournal />
      <CollectionsConcierge />
      <Footer />
    </>
  );
}
