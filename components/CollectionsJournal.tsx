import Image from 'next/image';
import Link from 'next/link';
import styles from './CollectionsJournal.module.css';

function ArrowRight({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

export default function CollectionsJournal() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>The Journal</span>
          </div>
          <h2 className={styles.heading}>On travelling with intention.</h2>
        </div>
        <Link href="/journal" className={styles.allLink}>All journal entries <ArrowRight size={12} /></Link>
      </div>

      <div className={styles.grid}>
        <Link href="/journal/kyoto-temple" className={styles.featuredArticle}>
          <div className={styles.featuredImg}>
            <Image src="/images/Collection Overview/CO-JOUR-01.png" alt="Japanese room with garden view — travelling with intention" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div className={styles.articleMeta}>Essay · 13 min read</div>
          <h3 className={styles.featuredTitle}>Why where you go matters considerably less than how you go there.</h3>
          <p className={styles.featuredBody}>On the relationship between intention and experience — and why the traveller who has decided what they are looking for before they leave tends to find something rather more significant than the traveller who has simply decided where to go.</p>
          <span className={styles.readLink}>Read the essay <ArrowRight /></span>
        </Link>

        <div className={styles.secondaryArticle}>
          <div className={styles.articleMeta}>Essay · 9 min read</div>
          <h3 className={styles.secondaryTitle}>The journey that changes nothing, and why it is the most valuable kind.</h3>
          <p className={styles.secondaryBody}>An argument for the journey in which nothing remarkable occurs — and for the quality of attention and presence that such a journey, paradoxically, tends to produce in the people who take it.</p>
          <Link href="/journal/dolomites-high-summer" className={styles.readLinkSmall}>Read <ArrowRight /></Link>
        </div>

        <div className={styles.secondaryArticle}>
          <div className={styles.articleMeta}>Journal · 7 min read</div>
          <h3 className={styles.secondaryTitle}>On the particular freedom of not knowing what kind of journey you need, and asking someone who might.</h3>
          <p className={styles.secondaryBody}>The conversation between a MERIDIAN concierge and a guest who arrived with a destination in mind and left with an entirely different kind of journey — one that turned out to be exactly what they were looking for.</p>
          <Link href="/journal/medina-before-the-souks" className={styles.readLinkSmall}>Read <ArrowRight /></Link>
        </div>
      </div>
    </section>
  );
}
