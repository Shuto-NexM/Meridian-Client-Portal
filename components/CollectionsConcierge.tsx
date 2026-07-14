import Link from 'next/link';
import styles from './CollectionsConcierge.module.css';

export default function CollectionsConcierge() {
  return (
    <section className={styles.section}>
      <div className={styles.topLine} />

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Your Private Concierge</span>
          </div>
          <h2 className={styles.heading}>Unsure which<br />collection is yours?</h2>
          <p className={styles.body1}>Begin with a conversation. Your concierge will ask the right questions — not about where you would like to go, but about the quality of time you are looking for — and the collection, and the journey, will become clear.</p>
          <p className={styles.body2}>Your concierge will write to you within two working days. There is no obligation, and no pressure toward any particular collection or destination.</p>
          <Link href="/begin-your-journey" className={styles.btnGold}>Begin the conversation</Link>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardLabel}>Private Concierge</div>
            <p className={styles.cardQuote}>&ldquo;In my experience, the right collection reveals itself within five minutes of a genuine conversation. The question is simply: what kind of time are you looking for?&rdquo;</p>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.contactOptions}>
              <div className={styles.contactRow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(58% 0.015 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Write to your concierge</span>
              </div>
              <div className={styles.contactRow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(58% 0.015 65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.81 19.79 19.79 0 0 1 1.61 1.18 2 2 0 0 1 3.58 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.08 6.08l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Request a call</span>
              </div>
            </div>
            <p className={styles.cardNote}>Response within two working days · No obligation · Private &amp; confidential</p>
          </div>
        </div>
      </div>
    </section>
  );
}
