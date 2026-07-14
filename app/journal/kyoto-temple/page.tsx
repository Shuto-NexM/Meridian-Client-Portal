import Nav from '@/components/Nav';
import ArticleReadingProgress from '@/components/ArticleReadingProgress';
import ArticleHero from '@/components/ArticleHero';
import ArticleBody from '@/components/ArticleBody';
import ArticleRelatedReading from '@/components/ArticleRelatedReading';
import ArticleRelatedJourney from '@/components/ArticleRelatedJourney';
import ArticleConcierge from '@/components/ArticleConcierge';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'What the temple at five in the morning communicates — The Journal · Meridian',
};

export default function KyotoTempleArticlePage() {
  return (
    <>
      <Nav activePage="The Journal" lightMode />
      <ArticleReadingProgress />
      <ArticleHero />
      <ArticleBody />
      <ArticleRelatedReading />
      <ArticleRelatedJourney />
      <ArticleConcierge />
      <Footer />
    </>
  );
}
