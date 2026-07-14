import Image from 'next/image';
import Link from 'next/link';
import styles from './WellnessJourneys.module.css';

function ArrowRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

export default function WellnessJourneys() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>24 curated journeys</span>
          </div>
          <h2 className={styles.heading}>Places that know<br /><em className={styles.headingMuted}>how to be still.</em></h2>
        </div>
        <Link href="/journeys" className={styles.viewAll}>View all journeys <ArrowRight /></Link>
      </div>

      {/* Row 1: Wide (1.5fr) + Narrow (1fr) */}
      <div className={styles.row1}>
        {/* Kyoto — featured wide */}
        <Link href="/journeys/kyoto" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgKyoto}`} style={{ height: '580px' }}>
            <Image src="/images/Wellness/WC-JNY-01.png" alt="Kyoto, Japan — wellness journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
            <div className={styles.imgTimestamp}>Kyoto, Japan · 06:12</div>
          </div>
          <div className={styles.cardOverlay}>
            <div className={styles.cardTag}>7 nights · Cultural &amp; Restoration</div>
            <h3 className={styles.cardTitleLg}>The city before it composes itself for company.</h3>
            <p className={styles.cardBodyLg}>November in Kyoto, before the famous week of colour. Temple gardens walked at dawn, a private ryokan in the eastern hills, the particular quality of light that belongs only to this city in this season.</p>
            <span className={styles.cardLink}>Explore this journey <ArrowRight /></span>
          </div>
        </Link>

        {/* Bali */}
        <Link href="/journeys/bali" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgBali}`} style={{ height: '580px' }}>
            <Image src="/images/Wellness/WC-JNY-02.png" alt="Bali, Indonesia — wellness journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
            <div className={styles.imgTimestamp}>Bali, Indonesia · Dawn</div>
          </div>
          <div className={styles.cardOverlay}>
            <div className={styles.cardTag}>10 nights · Deep Wellness</div>
            <h3 className={styles.cardTitleMd}>Above the rice terraces.<br />Below the noise of everything.</h3>
            <span className={styles.cardLink}>Explore this journey <ArrowRight /></span>
          </div>
        </Link>
      </div>

      {/* Row 2: Three equal */}
      <div className={styles.row2}>
        {/* Dolomites */}
        <Link href="/journeys/dolomites" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgDolomites}`} style={{ height: '380px' }}>
            <Image src="/images/Wellness/WC-JNY-03.png" alt="Dolomites — wellness journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
          </div>
          <div className={styles.cardOverlaySm}>
            <div className={styles.cardTagSm}>Dolomites · 5 nights</div>
            <h3 className={styles.cardTitleSm}>Mountains that insist<br />on silence.</h3>
            <span className={styles.cardLinkSm}>Explore <ArrowRight size={11} /></span>
          </div>
        </Link>

        {/* Sri Lanka */}
        <Link href="/journeys/sri-lanka" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgSriLanka}`} style={{ height: '380px' }}>
            <Image src="/images/Wellness/WC-JNY-04.png" alt="Sri Lanka — wellness journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
          </div>
          <div className={styles.cardOverlaySm}>
            <div className={styles.cardTagSm}>Sri Lanka · 6 nights</div>
            <h3 className={styles.cardTitleSm}>Where the Indian Ocean<br />exhales.</h3>
            <span className={styles.cardLinkSm}>Explore <ArrowRight size={11} /></span>
          </div>
        </Link>

        {/* Iceland */}
        <Link href="/journeys/iceland" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgIceland}`} style={{ height: '380px' }}>
            <Image src="/images/Wellness/WC-JNY-05.png" alt="Iceland — wellness journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
          </div>
          <div className={styles.cardOverlaySm}>
            <div className={styles.cardTagSm}>Iceland · 7 nights</div>
            <h3 className={styles.cardTitleSm}>The world at the edge<br />of everything.</h3>
            <span className={styles.cardLinkSm}>Explore <ArrowRight size={11} /></span>
          </div>
        </Link>
      </div>

      {/* Row 3: Narrow (1fr) + Editorial text card (1.5fr) */}
      <div className={styles.row3}>
        {/* Swiss Alps → nearest journey is /journeys/lofoten (mountain remoteness) */}
        <Link href="/journeys/lofoten" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgSwiss}`} style={{ height: '340px' }}>
            <Image src="/images/Wellness/WC-JNY-06.png" alt="Swiss Alps — wellness journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
          </div>
          <div className={styles.cardOverlaySm}>
            <div className={styles.cardTagSm}>Swiss Alps · 6 nights</div>
            <h3 className={styles.cardTitleSm}>Above the treeline,<br />below the mind.</h3>
            <span className={styles.cardLinkSm}>Explore <ArrowRight size={11} /></span>
          </div>
        </Link>

        {/* Morocco — editorial text card */}
        <div className={styles.editorialCard}>
          <div>
            <div className={styles.editorialTag}>Morocco · 5 nights</div>
            <h3 className={styles.editorialTitle}>Rose garden mornings<br />in the medina light.</h3>
            <p className={styles.editorialBody}>Amanjena, at the edge of the Palmeraie. A private riad, a garden of fragrance, the particular quality of morning light that arrives over the Atlas in late autumn and never looks the same twice.</p>
          </div>
          <div className={styles.editorialFooter}>
            <em className={styles.editorialSeason}>Curated for November &amp; March</em>
            <Link href="/journeys/morocco" className={styles.btnGhost}>Explore this journey</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
