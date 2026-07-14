import Image from 'next/image';
import Link from 'next/link';
import styles from './WellnessJournal.module.css';

const secondary = [
  {
    label: 'Dispatch',
    title: 'The case for arriving a day early.',
    body: 'Against the reflex to maximise, and in favour of the slow hour in the hotel bar before the journey properly begins.',
    date: 'October 2024',
    slug: 'case-for-arriving-early',
  },
  {
    label: 'Essay',
    title: 'On the ethics of doing nothing abroad.',
    body: 'Productivity culture has colonised the concept of rest. A meditation on what it means to travel without an agenda.',
    date: 'September 2024',
    slug: 'doing-nothing-abroad',
  },
];

export default function WellnessJournal() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>The Journal</span>
        </div>
        <h2 className={styles.heading}>
          Reading for the<br />
          <em className={styles.headingMuted}>unhurried traveller.</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {/* Featured article */}
        <Link href="/journal/kyoto-temple" className={styles.featured}>
          <div className={styles.featImg}>
            <div className={styles.featImgPlaceholder}>
              <Image src="/images/Wellness/WC-JOUR-01.png" alt="Kyoto ryokan — wellness journal feature" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.imgFade} />
            </div>
          </div>
          <div className={styles.featContent}>
            <div className={styles.articleLabel}>Feature</div>
            <h3 className={styles.featTitle}>What Japanese inns understand about rest that Western spas have almost certainly missed.</h3>
            <p className={styles.featBody}>The ryokan is not a hotel that also offers wellness. It is a building designed around the logic of restoration — a philosophy embedded in the sequence of rooms, the timing of meals, the quality of the silence that is actively maintained after nine in the evening. Twelve years of returning to the same inn in the hills above Kyoto, and what changed was not the place.</p>
            <div className={styles.featMeta}>
              <span className={styles.metaDate}>November 2024</span>
              <span className={styles.metaDot} />
              <span className={styles.metaRead}>12 min read</span>
            </div>
            <span className={styles.featLink}>Read the essay →</span>
          </div>
        </Link>

        {/* Secondary articles */}
        <div className={styles.secondaries}>
          {secondary.map((a) => (
            <Link key={a.title} href={`/journal/${a.slug}`} className={styles.secondary}>
              <div className={styles.articleLabel}>{a.label}</div>
              <h3 className={styles.secTitle}>{a.title}</h3>
              <p className={styles.secBody}>{a.body}</p>
              <div className={styles.secMeta}>
                <span className={styles.metaDate}>{a.date}</span>
              </div>
              <span className={styles.secLink}>Read →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
