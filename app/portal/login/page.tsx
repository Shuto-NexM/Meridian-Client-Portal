'use client';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();

  function enter() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('meridian-portal-auth', '1');
    }
    router.push('/portal');
  }

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.mark}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
            <line x1="10" y1="1" x2="10" y2="19" stroke="currentColor" strokeWidth="1.3"/>
            <line x1="1" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
        </div>

        <div className={styles.wordmark}>Meridian</div>
        <p className={styles.sub}>Private Client Portal</p>

        <div className={styles.divider} />

        <h1 className={styles.heading}>Welcome back,<br />Emily.</h1>
        <p className={styles.body}>
          Your journey portal is ready. Sofia has updated the Japan itinerary and left a note for your review.
        </p>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label}>Email address</label>
            <input
              className={styles.input}
              type="email"
              defaultValue="emily@weston.co.uk"
              autoComplete="email"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              defaultValue="••••••••••"
              autoComplete="current-password"
            />
          </div>
        </div>

        <button className={styles.cta} onClick={enter}>
          Enter Client Portal
        </button>

        <p className={styles.note}>
          This is a prototype. No authentication occurs.
        </p>

        <div className={styles.concierge}>
          <div className={styles.conciergeAvatar}>SL</div>
          <p className={styles.conciergeNote}>
            <strong>Sofia Laurent</strong> is available and expecting you.
          </p>
        </div>
      </div>

      <div className={styles.right} aria-hidden="true">
        <div className={styles.rightOverlay} />
        <div className={styles.rightCaption}>
          <span className={styles.kanji}>日本</span>
          <span className={styles.captionLabel}>Japan · Autumn 2026</span>
        </div>
      </div>
    </div>
  );
}
