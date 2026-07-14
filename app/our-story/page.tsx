export const metadata = { title: 'Our Story — Meridian Private Journeys' };

import Nav from '@/components/Nav';
import OurStoryHero from '@/components/OurStoryHero';
import OurStoryWhyWeBegan from '@/components/OurStoryWhyWeBegan';
import OurStoryBeliefs from '@/components/OurStoryBeliefs';
import OurStoryHowWeCurate from '@/components/OurStoryHowWeCurate';
import OurStoryApproach from '@/components/OurStoryApproach';
import OurStoryManifesto from '@/components/OurStoryManifesto';
import OurStoryJournal from '@/components/OurStoryJournal';
import OurStoryCta from '@/components/OurStoryCta';
import Footer from '@/components/Footer';

export default function OurStoryPage() {
  return (
    <>
      <Nav activePage="Our Story" />
      <OurStoryHero />
      <OurStoryWhyWeBegan />
      <OurStoryBeliefs />
      <OurStoryHowWeCurate />
      <OurStoryApproach />
      <OurStoryManifesto />
      <OurStoryJournal />
      <OurStoryCta />
      <Footer />
    </>
  );
}
