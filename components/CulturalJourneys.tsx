import Image from 'next/image';
import Link from 'next/link';
import styles from './CulturalJourneys.module.css';

function ArrowRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

export default function CulturalJourneys() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>22 curated journeys</span>
          </div>
          <h2 className={styles.heading}>Places where the ordinary<br /><em className={styles.headingMuted}>is extraordinary.</em></h2>
        </div>
        <Link href="/journeys" className={styles.viewAll}>View all journeys <ArrowRight /></Link>
      </div>

      {/* Row 1: Wide + Narrow */}
      <div className={styles.row1}>
        {/* Bhutan — featured wide */}
        <Link href="/journeys/bhutan" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgBhutan}`} style={{ height: '580px' }}>
            <Image src="/images/Cultural Immersion/CI-JNY-01.png" alt="Bhutan, Tiger's Nest — cultural journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
            <div className={styles.imgTimestamp}>Bhutan · Tiger&rsquo;s Nest · 07:20</div>
          </div>
          <div className={styles.cardOverlay}>
            <div className={styles.cardTag}>8 nights · Kingdom &amp; Craft</div>
            <h3 className={styles.cardTitleLg}>The kingdom that measures its wealth in something other than money.</h3>
            <p className={styles.cardBodyLg}>Eight nights in Bhutan&rsquo;s Paro and Punakha valleys. Temple mornings, farmhouse lunches, a private audience with a master thangka painter, and the particular quality of autumn light that belongs only to the Himalayan plateau in October.</p>
            <span className={styles.cardLink}>Explore this journey <ArrowRight /></span>
          </div>
        </Link>

        {/* Oaxaca */}
        <Link href="/journeys/morocco" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgOaxaca}`} style={{ height: '580px' }}>
            <Image src="/images/Cultural Immersion/CI-JNY-02.png" alt="Oaxaca, Mexico — cultural journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
            <div className={styles.imgTimestamp}>Oaxaca, Mexico · Market</div>
          </div>
          <div className={styles.cardOverlay}>
            <div className={styles.cardTag}>7 nights · Food &amp; Craft</div>
            <h3 className={styles.cardTitleMd}>Everything here has been made by hand.<br />Including the food.</h3>
            <span className={styles.cardLink}>Explore this journey <ArrowRight /></span>
          </div>
        </Link>
      </div>

      {/* Row 2: Three equal */}
      <div className={styles.row2}>
        {/* Noto → kyoto */}
        <Link href="/journeys/kyoto" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgNoto}`} style={{ height: '380px' }}>
            <Image src="/images/Cultural Immersion/CI-JNY-03.png" alt="Noto Peninsula, Japan — cultural journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
          </div>
          <div className={styles.cardOverlaySm}>
            <div className={styles.cardTagSm}>Noto Peninsula · 6 nights</div>
            <h3 className={styles.cardTitleSm}>Japan&rsquo;s quietest coast, its most unfinished pottery.</h3>
            <span className={styles.cardLinkSm}>Explore <ArrowRight size={11} /></span>
          </div>
        </Link>

        {/* Marrakech */}
        <Link href="/journeys/morocco" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgMarrakech}`} style={{ height: '380px' }}>
            <Image src="/images/Cultural Immersion/CI-JNY-04.png" alt="Marrakech, Morocco — cultural journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
          </div>
          <div className={styles.cardOverlaySm}>
            <div className={styles.cardTagSm}>Marrakech · 5 nights</div>
            <h3 className={styles.cardTitleSm}>The medina before the souks become a stage.</h3>
            <span className={styles.cardLinkSm}>Explore <ArrowRight size={11} /></span>
          </div>
        </Link>

        {/* Andalusia → scotland */}
        <Link href="/journeys/scotland" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgAndalusia}`} style={{ height: '380px' }}>
            <Image src="/images/Cultural Immersion/CI-JNY-05.png" alt="Andalusia, Spain — cultural journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
          </div>
          <div className={styles.cardOverlaySm}>
            <div className={styles.cardTagSm}>Andalusia · 8 nights</div>
            <h3 className={styles.cardTitleSm}>The south of Spain, outside the season of itself.</h3>
            <span className={styles.cardLinkSm}>Explore <ArrowRight size={11} /></span>
          </div>
        </Link>
      </div>

      {/* Row 3: Narrow + Editorial text card */}
      <div className={styles.row3}>
        {/* Tbilisi → sri-lanka */}
        <Link href="/journeys/sri-lanka" className={styles.card}>
          <div className={`${styles.cardImg} ${styles.imgTbilisi}`} style={{ height: '340px' }}>
            <Image src="/images/Cultural Immersion/CI-JNY-06.png" alt="Tbilisi, Georgia — cultural journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgGrad} />
          </div>
          <div className={styles.cardOverlaySm}>
            <div className={styles.cardTagSm}>Tbilisi · 6 nights</div>
            <h3 className={styles.cardTitleSm}>A city that has survived its own history and decided to keep it.</h3>
            <span className={styles.cardLinkSm}>Explore <ArrowRight size={11} /></span>
          </div>
        </Link>

        {/* Cusco — editorial text card */}
        <div className={styles.editorialCard}>
          <div>
            <div className={styles.editorialTag}>Cusco · 7 nights</div>
            <h3 className={styles.editorialTitle}>The oldest continuously inhabited city in the Americas, still in conversation with itself.</h3>
            <p className={styles.editorialBody}>Seven nights between Cusco and the Sacred Valley. Market mornings with a local cook. An afternoon in a traditional weaving cooperative. A private visit to a collection of pre-Columbian ceramics whose curator has been cataloguing them for thirty years.</p>
          </div>
          <div className={styles.editorialFooter}>
            <em className={styles.editorialSeason}>Best in April &amp; September</em>
            <Link href="/journeys/bhutan" className={styles.btnGhost}>Explore this journey</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
