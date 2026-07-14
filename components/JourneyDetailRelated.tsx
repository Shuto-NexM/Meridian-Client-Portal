import Image from 'next/image';
import Link from 'next/link';
import styles from './JourneyDetailRelated.module.css';

const ArrowRight = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
);

const related = [
  {
    img: 'JD-REL-01', slug: 'bali',
    alt: 'Bali',
    meta: 'Bali · 10 nights',
    title: 'Above the rice terraces.\nBelow the noise of everything.',
    gradient: 'linear-gradient(155deg, oklch(30% 0.038 80) 0%, oklch(20% 0.026 76) 55%, oklch(14% 0.018 72) 100%)',
    bottomGrad: 'oklch(14% 0.018 72 / 0.88)',
  },
  {
    img: 'JD-REL-02', slug: 'sri-lanka',
    alt: 'Sri Lanka',
    meta: 'Sri Lanka · 6 nights',
    title: 'Where the Indian Ocean exhales.',
    gradient: 'linear-gradient(152deg, oklch(26% 0.030 158) 0%, oklch(18% 0.022 152) 55%, oklch(13% 0.015 148) 100%)',
    bottomGrad: 'oklch(13% 0.015 148 / 0.88)',
  },
  {
    img: 'JD-REL-03', slug: 'dolomites',
    alt: 'Dolomites',
    meta: 'Dolomites · 5 nights',
    title: 'Mountains that insist on silence.',
    gradient: 'linear-gradient(150deg, oklch(32% 0.022 215) 0%, oklch(22% 0.016 210) 55%, oklch(15% 0.010 206) 100%)',
    bottomGrad: 'oklch(15% 0.010 206 / 0.88)',
  },
];

export default function JourneyDetailRelated() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Continue Your Journey</span>
          </div>
          <h2 className={styles.h2}>
            Other journeys you<br />
            <em className={styles.h2Italic}>may wish to consider.</em>
          </h2>
        </div>
        <Link href="/journeys" className={styles.allLink}>
          View all journeys <ArrowRight />
        </Link>
      </div>

      <div className={styles.grid}>
        {related.map((r) => (
          <Link key={r.img} href={`/journeys/${r.slug}`} className={styles.card}>
            <div className={styles.cardImgWrap} style={{ background: r.gradient }}>
              <Image src={`/images/Journey detail template/${r.img}.png`} alt={r.alt} fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.cardGrad} style={{ background: `linear-gradient(to top, ${r.bottomGrad} 0%, transparent 100%)` }} />
            </div>
            <div className={styles.cardOverlay}>
              <div className={styles.cardMeta}>{r.meta}</div>
              <h3 className={styles.cardTitle}>{r.title}</h3>
              <span className={styles.cardLink}>Explore <ArrowRight /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
