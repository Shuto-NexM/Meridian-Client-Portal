import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import ArticleReadingProgress from '@/components/ArticleReadingProgress';
import ArticleHero from '@/components/ArticleHero';
import ArticleBody from '@/components/ArticleBody';
import ArticleRelatedReading from '@/components/ArticleRelatedReading';
import ArticleRelatedJourney from '@/components/ArticleRelatedJourney';
import ArticleConcierge from '@/components/ArticleConcierge';
import Footer from '@/components/Footer';
import { ARTICLES, getArticle } from '@/lib/articles';

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Article Not Found — Meridian' };
  return { title: `${article.title} — The Journal · Meridian` };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  // Full article template — used for kyoto-temple slug
  if (slug === 'kyoto-temple') {
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

  // Editorial placeholder for other articles
  return (
    <>
      <Nav activePage="The Journal" lightMode />
      <article>
        <section style={{
          paddingTop: '120px', paddingBottom: '80px',
          maxWidth: '760px', margin: '0 auto', padding: '120px 40px 80px',
        }}>
          <div style={{ marginBottom: '32px' }}>
            <Link href="/journal" style={{ fontSize: '12px', letterSpacing: '0.06em', color: 'var(--m-stone)', textDecoration: 'none' }}>
              ← The Journal
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
            <span style={{
              fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--m-stone)', border: '1px solid var(--m-border)', padding: '4px 10px', borderRadius: '2px',
            }}>{article.label}</span>
            <span style={{ fontSize: '12px', color: 'var(--m-stone)' }}>{article.readTime}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-d)', fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 400, color: 'var(--m-ink)', lineHeight: 1.2, marginBottom: '24px',
          }}>{article.title}</h1>
          <p style={{ fontSize: '20px', color: 'var(--m-charcoal)', lineHeight: 1.65, marginBottom: '16px', fontStyle: 'italic' }}>
            {article.excerpt}
          </p>
          <div style={{ fontSize: '12px', color: 'var(--m-stone)', marginBottom: '64px' }}>
            {article.date}{article.location ? ` · ${article.location}` : ''}
          </div>

          <div style={{ borderTop: '1px solid var(--m-border-s)', paddingTop: '48px' }}>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--m-charcoal)', marginBottom: '28px' }}>
              This essay is part of the MERIDIAN Journal — a record of places, observations, and the particular quality of attention that travel at a certain pace makes possible.
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--m-charcoal)', marginBottom: '28px' }}>
              {article.excerpt}
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--m-charcoal)', marginBottom: '48px', fontStyle: 'italic' }}>
              — The MERIDIAN Journal, {article.date}
            </p>
          </div>

          <div style={{
            borderTop: '1px solid var(--m-border-s)', paddingTop: '48px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <Link href="/journal" style={{ fontSize: '13px', color: 'var(--m-stone)', textDecoration: 'none', letterSpacing: '0.04em' }}>
              ← All essays
            </Link>
            <Link href="/begin-your-journey" style={{
              display: 'inline-block', background: 'var(--m-ink)', color: 'white',
              padding: '12px 24px', borderRadius: '4px', fontSize: '12px',
              letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
            }}>Begin a journey</Link>
          </div>
        </section>
      </article>
      <ArticleRelatedReading />
      <ArticleConcierge />
      <Footer />
    </>
  );
}
