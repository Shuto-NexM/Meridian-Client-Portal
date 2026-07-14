import Link from 'next/link';
import styles from './JourneyDetailCta.module.css';

const DownloadIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function JourneyDetailCta() {
  return (
    <section className={styles.section}>
      <div className={styles.topLine} />
      <div className={styles.inner}>

        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Begin This Journey</span>
          </div>
          <h2 className={styles.heading}>
            Before the<br />
            <em className={styles.headingItalic}>leaves fall.</em>
          </h2>
          <p className={styles.body}>
            This journey is shaped to the week of November 10–17. We work with a small number of guests each season, which is why every aspect of the experience can be made specific to you.
          </p>
          <p className={styles.bodyFaded}>
            Tell us what you are looking for. Your concierge will write to you within two working days to begin a conversation about how this journey might be shaped around your particular way of travelling.
          </p>
          <div className={styles.ctas}>
            <Link href="/begin-your-journey" className={styles.btnGold}>Begin a conversation</Link>
            <Link href="/begin-your-journey" className={styles.btnText}>
              Download journey notes <DownloadIcon />
            </Link>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardLabel}>Wellness &amp; Restoration Concierge</div>
            <blockquote className={styles.cardQuote}>
              &ldquo;I have been to every property on this journey before dawn. I know which morning is most worth the early alarm.&rdquo;
            </blockquote>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.actions}>
              <Link href="/begin-your-journey" className={styles.actionItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="oklch(56% 0.015 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <span className={styles.actionLabel}>Write to your concierge</span>
              </Link>
              <Link href="/private-concierge" className={styles.actionItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="oklch(56% 0.015 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.81 19.79 19.79 0 0 1 1.61 1.18 2 2 0 0 1 3.58 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.08 6.08l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className={styles.actionLabel}>Request a call</span>
              </Link>
            </div>
            <p className={styles.cardNote}>Response within two working days &middot; No obligation &middot; Private &amp; confidential</p>
          </div>
        </div>

      </div>
    </section>
  );
}
