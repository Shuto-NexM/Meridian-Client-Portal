import Link from 'next/link';
import styles from './ConciergeCta.module.css';

export default function ConciergeCta() {
  return (
    <section className={styles.section}>
      <div className={styles.topLine} />
      <div className={styles.grid}>
        {/* Left */}
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            Begin here
          </div>
          <h2 className={styles.h2}>
            The first conversation is always<br />
            <em className={styles.h2Em}>the most important one.</em>
          </h2>
          <p className={styles.p}>Write to us. No obligation, no form, no system. Simply tell us what you are looking for — in whatever form that thought currently takes. Your concierge will respond within two working days.</p>
          <p className={styles.p2}>The journey begins when the conversation does.</p>
          <div className={styles.actions}>
            <Link href="/begin-your-journey" className={styles.btnGold}>Write to your concierge</Link>
            <Link href="/private-concierge" className={styles.callLink}>
              Request a call
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right: dark card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardLabel}>Private Concierge</div>
            <div className={styles.cardQuote}>
              &ldquo;There is no journey too simple to deserve careful thought, and no request too uncertain to be worth beginning a conversation about.&rdquo;
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardActions}>
              <div className={styles.cardAction}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(58% 0.015 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <span className={styles.cardActionLabel}>Write to your concierge</span>
              </div>
              <div className={styles.cardAction}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(58% 0.015 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.81 19.79 19.79 0 0 1 1.61 1.18 2 2 0 0 1 3.58 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.08 6.08l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className={styles.cardActionLabel}>Request a call</span>
              </div>
            </div>
            <p className={styles.cardNote}>Response within two working days · No obligation · Private &amp; confidential</p>
          </div>
        </div>
      </div>
    </section>
  );
}
