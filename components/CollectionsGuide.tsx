import Link from 'next/link';
import styles from './CollectionsGuide.module.css';

function ArrowRight({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

export default function CollectionsGuide() {
  return (
    <>
      {/* § 4 — Choosing your collection */}
      <section className={styles.choosingSection}>
        <div className={styles.choosingInner}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Choosing a collection</span>
          </div>
          <h2 className={styles.choosingHeading}>Begin with intention,<br /><em className={styles.headingMuted}>not with geography.</em></h2>

          <div className={styles.choosingGrid}>
            <div>
              <p className={styles.choosingBody}>Most journeys begin with a destination. A place appears — in a magazine, in conversation, in a photograph — and produces a desire to be there. This is a reasonable way to begin, and it often produces fine journeys. But it is not the MERIDIAN way, because the question of where to go, asked alone, misses the more important question that should precede it: in what quality of relationship with the world do you most need to spend the next ten days?</p>
              <p className={styles.choosingBody}>The answer to that question determines the collection. The collection determines the destinations that can serve it. The destination is the last decision rather than the first — and because it is preceded by so many more important ones, it tends to be the right one.</p>
            </div>
            <div>
              <p className={styles.choosingBody}>Your MERIDIAN concierge will begin, always, from this question. Not where would you like to go, but what are you looking for in the time you are about to give to a journey? The answer, in our experience, is almost never about scenery or activities or the specific qualities of a named destination. It is about a quality of time. A quality of attention. A relationship with the world that ordinary life does not readily permit.</p>
              <p className={styles.choosingBody}>Once that quality has been identified, the collection reveals itself. And once the collection has been identified, we can find you the exact journey — the specific place, the specific season, the specific quality of morning — that best serves it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* § 5 — Collection comparison */}
      <section className={styles.comparisonSection}>
        <div className={styles.comparisonHeader}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>If you are seeking</span>
          </div>
          <h2 className={styles.comparisonHeading}>Which collection belongs to you.</h2>
        </div>

        <div className={styles.comparisonGrid}>
          {[
            {
              num: '01',
              title: 'Stillness',
              body: 'You are looking for a quality of quiet that your ordinary life does not produce. You would like to sleep deeply, wake without obligation, and spend several days at a pace that is entirely your own.',
              cta: 'Wellness & Restoration',
              href: '/collections/wellness',
            },
            {
              num: '02',
              title: 'Understanding',
              body: 'You are interested in people, in craft, in the ordinary life of another culture. You would like to spend time in places where things are made, and meals are prepared, and traditions are practised with complete unselfconsciousness.',
              cta: 'Cultural Immersion',
              href: '/collections/cultural-immersion',
            },
            {
              num: '03',
              title: 'Perspective',
              body: 'You are looking for landscapes large enough that your ordinary concerns recalibrate in their presence. You would like to be somewhere genuinely remote, for long enough that remoteness becomes a quality of its own rather than merely a feature.',
              cta: 'Adventure & Landscape',
              href: '/collections/adventure-landscape',
            },
            {
              num: '04',
              title: 'Presence',
              body: 'You are beginning something together, and you would like the first weeks of that beginning to be unhurried and private. You are looking for time — more of it, and of a better quality, than ordinary life provides.',
              cta: 'Honeymoon Journeys',
              href: '/collections/honeymoon',
            },
          ].map(({ num, title, body, cta, href }) => (
            <div key={num} className={styles.compCell}>
              <div className={styles.compNum}>{num}</div>
              <div className={styles.compTitle}>{title}</div>
              <p className={styles.compBody}>{body}</p>
              <Link href={href} className={styles.compLink}>{cta} <ArrowRight /></Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
