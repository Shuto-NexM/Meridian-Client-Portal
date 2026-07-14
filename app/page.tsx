import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import FeaturedExperiences from '@/components/FeaturedExperiences';
import CollectionsSection from '@/components/CollectionsSection';
import JourneyDesigner from '@/components/JourneyDesigner';
import HowItWorks from '@/components/HowItWorks';
import FeaturedJourney from '@/components/FeaturedJourney';
import JournalSection from '@/components/JournalSection';
import MeridianCircle from '@/components/MeridianCircle';
import FinalSignature from '@/components/FinalSignature';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Nav />
      <HeroSection />
      <FeaturedExperiences />
      <CollectionsSection />
      <JourneyDesigner />
      <HowItWorks />
      <FeaturedJourney />
      <JournalSection />
      <MeridianCircle />
      <FinalSignature />
      <Footer />
    </div>
  );
}
