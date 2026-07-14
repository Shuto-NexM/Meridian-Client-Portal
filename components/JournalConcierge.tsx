import Link from 'next/link';
import styles from './JournalConcierge.module.css';

export default function JournalConcierge() {
  return (
    <section className={styles.section}>
      <div className={styles.topLine} />
      <div className={styles.inner}>
        {/* Left column */}
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            Begin a Journey
          </div>
          <h2 className={styles.h2}>
            Reading about a place is never quite the same as being in it.
          </h2>
          <p className={styles.body}>
            The essays in this journal exist to deepen your understanding of the places and principles that inform our journeys. When a piece of writing makes you want to go somewhere, that is the right moment to begin a conversation about what that journey might become.
          </p>
          <p className={styles.bodyFaded}>
            Your concierge will write to you within two working days.
          </p>
          <Link href="/begin-your-journey" className={styles.btnGold}>Begin the conversation</Link>
        </div>

        {/* Right column: concierge card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardLabel}>Private Concierge</div>
            <div className={styles.cardQuote}>
              &ldquo;Tell us which essay brought you here, and we can tell you which journey it most closely corresponds to.&rdquo;
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.actions}>
              <div className={styles.actionItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(58% 0.015 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <span className={styles.actionLabel}>Write to your concierge</span>
              </div>
              <div className={styles.actionItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(58% 0.015 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.81 19.79 19.79 0 0 1 1.61 1.18 2 2 0 0 1 3.58 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.08 6.08l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className={styles.actionLabel}>Request a call</span>
              </div>
            </div>
            <p className={styles.cardNote}>Response within two working days &middot; No obligation &middot; Private &amp; confidential</p>
          </div>
        </div>
      </div>
    </section>
  );
}
