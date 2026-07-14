import Link from 'next/link';
import styles from './FinalSignature.module.css';

export default function FinalSignature() {
  return (
    <section className={styles.section}>
      <div className={styles.glow}/>
      <div className={styles.texture}/>
      <div className={styles.content}>
        <div className={styles.wordmark}>Meridian</div>
        <div className={styles.statement}>Some journeys begin<br />long before departure.</div>
        <Link href="/begin-your-journey" className={styles.cta}>
          Begin yours
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
          </svg>
        </Link>
      </div>
      <div className={styles.bottomLine}>
        <div className={styles.lineDecor}/>
      </div>
    </section>
  );
}
