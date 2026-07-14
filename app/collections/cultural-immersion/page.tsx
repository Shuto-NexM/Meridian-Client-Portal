import Nav from '@/components/Nav';
import CulturalHero from '@/components/CulturalHero';
import CulturalPhilosophy from '@/components/CulturalPhilosophy';
import CulturalJourneys from '@/components/CulturalJourneys';
import CulturalQualities from '@/components/CulturalQualities';
import CulturalFeatured from '@/components/CulturalFeatured';
import CulturalDay from '@/components/CulturalDay';
import CulturalJournal from '@/components/CulturalJournal';
import CulturalConcierge from '@/components/CulturalConcierge';
import CulturalCta from '@/components/CulturalCta';
import Footer from '@/components/Footer';

export const metadata = { title: 'Cultural Immersion — Meridian Private Journeys' };

export default function CulturalImmersionPage() {
  return (
    <>
      <Nav activePage="Cultural Immersion" />
      <CulturalHero />
      <CulturalPhilosophy />
      <CulturalJourneys />
      <CulturalQualities />
      <CulturalFeatured />
      <CulturalDay />
      <CulturalJournal />
      <CulturalConcierge />
      <CulturalCta />
      <Footer />
    </>
  );
}
