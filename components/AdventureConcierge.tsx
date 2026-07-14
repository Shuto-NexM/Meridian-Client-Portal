import Link from 'next/link';
import styles from './AdventureConcierge.module.css';

export default function AdventureConcierge() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Left */}
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Your Private Concierge</span>
          </div>
          <h2 className={styles.heading}>
            Every journey begins<br />with a conversation.
          </h2>
          <p className={styles.body}>
            Not a booking form. A conversation with a person who has been to the edge of the map and back, who understands that what you are looking for in a landscape is not a view but a particular quality of time, and who will shape the journey accordingly.
          </p>
          <p className={styles.bodyFaded}>
            Your concierge will write to you within two working days. We are glad you are considering travelling with us.
          </p>
          <Link href="/begin-your-journey" className={styles.btnGold}>Begin the conversation</Link>
        </div>

        {/* Right — card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardLabel}>Landscape &amp; Expedition Concierge</div>
            <blockquote className={styles.cardQuote}>
              &ldquo;Tell us how much of the world you are looking for. We will find the exact proportion of remoteness and comfort that lets you stay long enough for it to matter.&rdquo;
            </blockquote>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.actions}>
              <div className={styles.actionItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(58% 0.015 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <span className={styles.actionLabel}>Write to your concierge</span>
              </div>
              <Link href="/private-concierge" className={styles.actionItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(58% 0.015 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
