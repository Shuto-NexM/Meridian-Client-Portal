import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JourneyDetailHero from '@/components/JourneyDetailHero';
import JourneyDetailPhilosophy from '@/components/JourneyDetailPhilosophy';
import JourneyDetailOverview from '@/components/JourneyDetailOverview';
import JourneyDetailTimeline from '@/components/JourneyDetailTimeline';
import JourneyDetailStays from '@/components/JourneyDetailStays';
import JourneyDetailQuiet from '@/components/JourneyDetailQuiet';
import JourneyDetailRelated from '@/components/JourneyDetailRelated';
import JourneyDetailCta from '@/components/JourneyDetailCta';
import { JOURNEYS, getJourney } from '@/lib/journeys';

export async function generateStaticParams() {
  return JOURNEYS.map(j => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) return { title: 'Journey Not Found — Meridian' };
  return { title: `${journey.title} — ${journey.location} · Meridian Private Journeys` };
}

export default async function JourneyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) notFound();

  // The full Kyoto detail template — reused for the kyoto slug
  if (slug === 'kyoto') {
    return (
      <>
        <Nav activePage="Journeys" />
        <JourneyDetailHero />
        <JourneyDetailPhilosophy />
        <JourneyDetailOverview />
        <JourneyDetailTimeline />
        <JourneyDetailStays />
        <JourneyDetailQuiet />
        <JourneyDetailRelated />
        <JourneyDetailCta />
        <Footer />
      </>
    );
  }

  // Placeholder detail page for all other journeys
  return (
    <>
      <Nav activePage="Journeys" />
      <section style={{
        minHeight: '72vh',
        background: journey.gradient,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '0 96px 80px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, oklch(8% 0.008 65 / 0.85) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', fontSize: '12px', letterSpacing: '0.06em', color: 'oklch(72% 0.012 68)' }}>
            <Link href="/journeys" style={{ color: 'inherit', textDecoration: 'none' }}>Journeys</Link>
            <span>›</span>
            <Link href={journey.collectionPage} style={{ color: 'inherit', textDecoration: 'none' }}>{journey.collectionLabel}</Link>
            <span>›</span>
            <span style={{ color: 'oklch(85% 0.012 68)' }}>{journey.country}</span>
          </div>
          <div style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--m-gold)', marginBottom: '16px' }}>
            {journey.badge}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-d)', fontSize: 'clamp(40px, 5vw, 68px)',
            fontWeight: 400, color: 'white', lineHeight: 1.1,
            maxWidth: '720px', marginBottom: '24px',
          }}>{journey.title}</h1>
          <p style={{ color: 'oklch(78% 0.010 68)', fontSize: '18px', maxWidth: '560px', lineHeight: 1.65, marginBottom: '32px' }}>
            {journey.body}
          </p>
          <div style={{ display: 'flex', gap: '32px', marginBottom: '48px', fontSize: '13px', color: 'oklch(68% 0.010 68)' }}>
            <span>{journey.nights}</span>
            <span>·</span>
            <span>{journey.season}</span>
            <span>·</span>
            <span>{journey.location}</span>
          </div>
          <Link href="/begin-your-journey" style={{
            display: 'inline-block', background: 'var(--m-gold)', color: 'white',
            padding: '14px 32px', borderRadius: '4px', fontSize: '13px',
            letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
          }}>Begin this journey</Link>
        </div>
        <div style={{ position: 'absolute', bottom: '32px', right: '96px', zIndex: 1 }}>
          <div style={{ fontSize: '11px', color: 'oklch(58% 0.008 65)', letterSpacing: '0.05em' }}>{journey.heroCaption}</div>
        </div>
      </section>

      <section style={{ padding: '96px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--m-gold)' }} />
            <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--m-stone)' }}>About this journey</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '42px', fontWeight: 400, color: 'var(--m-ink)', lineHeight: 1.2, marginBottom: '24px' }}>
            {journey.country} · {journey.nights}
          </h2>
          <p style={{ fontSize: '18px', lineHeight: 1.7, color: 'var(--m-charcoal)', maxWidth: '680px', marginBottom: '48px' }}>
            {journey.body} This journey is curated by a single MERIDIAN concierge who knows the destination well and will design every detail around what you are looking for — not what is most convenient.
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--m-charcoal)', maxWidth: '680px', marginBottom: '48px', fontStyle: 'italic' }}>
            Full journey details, itinerary, and accommodation selection are shared during your initial concierge conversation. No two journeys are identical.
          </p>
          <Link href="/begin-your-journey" style={{
            display: 'inline-block', background: 'var(--m-ink)', color: 'white',
            padding: '14px 32px', borderRadius: '4px', fontSize: '13px',
            letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
          }}>Begin a conversation</Link>
        </div>

        <div style={{ borderTop: '1px solid var(--m-border-s)', paddingTop: '48px', display: 'flex', gap: '16px' }}>
          <Link href="/journeys" style={{ color: 'var(--m-stone)', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.04em' }}>← All journeys</Link>
          <span style={{ color: 'var(--m-border)' }}>·</span>
          <Link href={journey.collectionPage} style={{ color: 'var(--m-stone)', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.04em' }}>{journey.collectionLabel}</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
