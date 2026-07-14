import Image from 'next/image';
import Link from 'next/link';
import styles from './JournalLatest.module.css';

function ArrowIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

export default function JournalLatest() {
  return (
    <section className={styles.section}>
      {/* Section header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Recent Writing</span>
          </div>
          <h2 className={styles.h2}>The latest essays.</h2>
        </div>
        <Link href="/journal" className={styles.allLink}>
          All 42 essays <ArrowIcon />
        </Link>
      </div>

      {/* Row 1: two wide cards */}
      <div className={styles.row1}>
        {/* Card A — Landscape */}
        <Link href="/journal/kyoto-temple" className={styles.wideCard}>
          <div className={styles.wideImgWrap}>
            <div className={styles.wideImgBgA} />
            <Image src="/images/Jernal overview & Article template/JV-CARD-01.png" alt="Large landscape" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.wideImgFade} />
          </div>
          <div className={styles.wideCardBody}>
            <div className={styles.cardMeta}>
              <span className={styles.cardTag}>Landscape</span>
              <span className={styles.cardDot}>·</span>
              <span className={styles.cardRead}>11 min read</span>
            </div>
            <h3 className={styles.wideTitle}>What very large landscapes do to the size of everything else.</h3>
            <p className={styles.wideBody}>On the particular recalibration that occurs when a person has been in a genuinely remote landscape for more than three days — and why this effect persists for months after the return.</p>
            <span className={styles.readLink}>Read <ArrowIcon size={11} /></span>
          </div>
        </Link>

        {/* Card B — Craft */}
        <Link href="/journal/why-we-travel-before-the-season" className={styles.wideCard}>
          <div className={styles.wideImgWrap}>
            <div className={styles.wideImgBgB} />
            <Image src="/images/Jernal overview & Article template/JV-CARD-02.png" alt="Artisan craft" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.wideImgFade} />
          </div>
          <div className={styles.wideCardBody}>
            <div className={styles.cardMeta}>
              <span className={styles.cardTag}>Craft</span>
              <span className={styles.cardDot}>·</span>
              <span className={styles.cardRead}>9 min read</span>
            </div>
            <h3 className={styles.wideTitle}>What the hands know that the face cannot show.</h3>
            <p className={styles.wideBody}>On the particular intelligence contained in the hands of a master craftsperson — and what it means to be in the presence of skill that has been practised long enough to become a form of knowledge held entirely in the body.</p>
            <span className={styles.readLink}>Read <ArrowIcon size={11} /></span>
          </div>
        </Link>
      </div>

      {/* Row 2: three small cards on raised bg */}
      <div className={styles.row2}>
        {/* Card C — Silence */}
        <Link href="/journal/doing-nothing-abroad" className={styles.smallCard}>
          <div className={styles.smallImgWrap}>
            <div className={styles.smallImgBgC} />
            <Image src="/images/Jernal overview & Article template/JV-CARD-03.png" alt="Empty room" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div className={styles.cardMeta}>
            <span className={styles.cardTag}>Silence</span>
            <span className={styles.cardDot}>·</span>
            <span className={styles.cardRead}>7 min read</span>
          </div>
          <h3 className={`${styles.smallTitle} ${styles.smallTitleFlex}`}>On the difficulty of sitting in silence and the value of getting better at it.</h3>
          <span className={styles.readLinkSm}>Read <ArrowIcon size={10} /></span>
        </Link>

        {/* Card D — Morning Rituals */}
        <Link href="/journal/case-for-arriving-early" className={styles.smallCard}>
          <div className={styles.smallImgWrap}>
            <div className={styles.smallImgBgD} />
            <Image src="/images/Jernal overview & Article template/JV-CARD-04.png" alt="Morning tea" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div className={styles.cardMeta}>
            <span className={styles.cardTag}>Morning Rituals</span>
            <span className={styles.cardDot}>·</span>
            <span className={styles.cardRead}>8 min read</span>
          </div>
          <h3 className={`${styles.smallTitle} ${styles.smallTitleFlex}`}>Why every meaningful journey should include at least one morning with nowhere to be at any particular hour.</h3>
          <span className={styles.readLinkSm}>Read <ArrowIcon size={10} /></span>
        </Link>

        {/* Card E — Architecture */}
        <Link href="/journal/medina-before-the-souks" className={styles.smallCard}>
          <div className={styles.smallImgWrap}>
            <div className={styles.smallImgBgE} />
            <Image src="/images/Jernal overview & Article template/JV-CARD-05.png" alt="Winter building" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div className={styles.cardMeta}>
            <span className={styles.cardTag}>Architecture</span>
            <span className={styles.cardDot}>·</span>
            <span className={styles.cardRead}>10 min read</span>
          </div>
          <h3 className={`${styles.smallTitle} ${styles.smallTitleFlex}`}>The buildings that were made for winter, and what they know about warmth that summer architecture cannot.</h3>
          <span className={styles.readLinkSm}>Read <ArrowIcon size={10} /></span>
        </Link>
      </div>

      {/* Row 3: text card + image card */}
      <div className={styles.row3}>
        {/* Card F — Destination Notes text card */}
        <div className={styles.textCard}>
          <div className={styles.textCardTop}>
            <div className={styles.cardMeta}>
              <span className={styles.cardTag}>Destination Notes</span>
              <span className={styles.cardDot}>·</span>
              <span className={styles.cardRead}>6 min read</span>
            </div>
            <h3 className={styles.textCardTitle}>Noto Peninsula: what the earthquake did not take.</h3>
            <p className={styles.textCardBody}>A personal account of returning to Japan&rsquo;s Noto Peninsula eighteen months after the 2024 earthquake — and finding something in the reconstruction that was not there before. On the relationship between loss and clarity.</p>
          </div>
          <div className={styles.textCardFooter}>
            <span className={styles.textCardDate}>September 2026</span>
            <Link href="/journal/dolomites-high-summer" className={styles.readLink}>Read <ArrowIcon size={11} /></Link>
          </div>
        </div>

        {/* Card G — Walking image card */}
        <Link href="/journal/honeymoon-as-pace" className={styles.imgCard}>
          <div className={styles.imgCardWrap}>
            <div className={styles.imgCardBg} />
            <Image src="/images/Jernal overview & Article template/JV-CARD-06.png" alt="Walking without destination" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgCardGrad} />
            <div className={styles.imgCardText}>
              <div className={styles.imgCardMeta}>Walking · 13 min read</div>
              <h3 className={styles.imgCardTitle}>On walking without a destination, which is a different thing from being lost.</h3>
            </div>
          </div>
          <span className={styles.readLink} style={{ marginTop: '0' }}>Read <ArrowIcon size={11} /></span>
        </Link>
      </div>
    </section>
  );
}
