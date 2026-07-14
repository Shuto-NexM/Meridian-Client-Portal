import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import JourneyWorkspace from '@/components/JourneyWorkspace';
import Footer from '@/components/Footer';
import { getJourney, JOURNEYS } from '@/data/journeys';

export function generateStaticParams() {
  return JOURNEYS.map(j => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) return { title: 'Journey Workspace — Meridian' };
  return { title: `${journey.title} Workspace — Meridian Private Journeys` };
}

export default async function JourneyWorkspacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) notFound();

  return (
    <>
      <Nav activePage="Begin" goldCta />
      <JourneyWorkspace journey={journey} />
      <Footer />
    </>
  );
}
