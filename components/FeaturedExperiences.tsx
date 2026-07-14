import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedExperiences.module.css';

function ArrowRight({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
    </svg>
  );
}

export default function FeaturedExperiences() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}><div className={styles.eyebrowLine}/> Featured this season</div>
          <h2 className={styles.heading}>Journeys that deserve your attention.</h2>
        </div>
        <Link href="/journeys" className={styles.viewAll}>View all journeys <ArrowRight /></Link>
      </div>

      <div className={styles.grid}>

        {/* Featured portrait card (spans both rows) — whole card is the link */}
        <Link href="/journeys/bali" className={styles.featuredCard}>
          <div className={styles.featuredImg}>
            <Image src="/images/Home/HP-FEAT-01.png" alt="Como Shambhala Estate, Bali — wellness sanctuary above Ubud rice terraces" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.featuredImgGrad}/>
            <div className={styles.imgOverlay}>
              <div className={styles.imgLocation}>Bali, Indonesia</div>
              <div className={styles.imgTitle}>Como Shambhala Estate</div>
            </div>
          </div>
          <div className={styles.featuredBody}>
            <div className={styles.tag}>Wellness · 7 nights</div>
            <p className={styles.featuredDesc}>A sanctuary in the Balinese hills, above Ubud's rice terraces. Designed for the restoration of everything the world takes from you — silently, without schedule.</p>
            <div className={styles.featuredFooter}>
              <p className={styles.featuredQuote}>Your concierge will shape every detail before you arrive.</p>
              <span className={styles.btnGold} aria-hidden="true">Explore →</span>
            </div>
          </div>
        </Link>

        {/* Standard portrait card (top-right) — whole card is the link */}
        <Link href="/journeys/kyoto" className={styles.standardCard}>
          <div className={styles.standardImg}>
            <Image src="/images/Home/HP-COL-01.png" alt="Kyoto before it wakes — early morning temple walk" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.standardImgGrad}/>
            <div className={styles.imgOverlay}>
              <div className={styles.imgLocationSm}>Kyoto, Japan</div>
              <div className={styles.imgTitleSm}>The city before it wakes</div>
            </div>
          </div>
          <div className={styles.standardBody}>
            <div>
              <div className={styles.tag}>Cultural · 5 nights</div>
              <p className={styles.standardDesc}>Temple walks before the first tour group arrives. A private tea ceremony with a family that has practised the ritual for seven generations.</p>
            </div>
            <span className={styles.btnOutline} aria-hidden="true">View Journey</span>
          </div>
        </Link>

        {/* Landscape editorial card (bottom-right) — whole card is the link */}
        <Link href="/journeys/patagonia" className={styles.landscapeCard}>
          <div className={styles.landscapeImg}>
            <Image src="/images/Home/HP-COL-03.png" alt="Torres del Paine, Patagonia — adventure landscape at the end of the earth" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.landscapeImgFade}/>
          </div>
          <div className={styles.landscapeBody}>
            <div>
              <div className={styles.tag}>Adventure · Patagonia · 8 nights</div>
              <h3 className={styles.landscapeTitle}>The end of the earth,<br /><em>unhurried.</em></h3>
              <p className={styles.landscapeDesc}>Torres del Paine before the season begins. Private guides. Days shaped entirely by weather, light, and inclination.</p>
            </div>
            <span className={styles.btnText} aria-hidden="true">
              View Journey <ArrowRight size={12} />
            </span>
          </div>
        </Link>

      </div>
    </section>
  );
}
