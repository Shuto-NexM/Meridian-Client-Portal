import Nav from '@/components/Nav';
import JourneysHero from '@/components/JourneysHero';
import JourneysInteractive from '@/components/JourneysInteractive';
import JourneysSeasonal from '@/components/JourneysSeasonal';
import JourneysJournal from '@/components/JourneysJournal';
import JourneysConcierge from '@/components/JourneysConcierge';
import Footer from '@/components/Footer';

export const metadata = { title: 'Journeys — Meridian Private Journeys' };

export default function JourneysPage() {
  return (
    <>
      <Nav activePage="Journeys" />
      <JourneysHero />
      <JourneysInteractive />
      <JourneysSeasonal />
      <JourneysJournal />
      <JourneysConcierge />
      <Footer />
    </>
  );
}
