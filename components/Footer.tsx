'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const JOURNEY_LINKS = [
  { label: 'All Destinations', href: '/journeys' },
  { label: 'Wellness & Restoration', href: '/collections/wellness' },
  { label: 'Cultural Immersion', href: '/collections/cultural-immersion' },
  { label: 'Adventure & Landscape', href: '/collections/adventure-landscape' },
  { label: 'Honeymoon Journeys', href: '/collections/honeymoon' },
  { label: 'Meridian Circle', href: '/private-concierge' },
];

const COMPANY_LINKS = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'The Journal', href: '/journal' },
  { label: 'Our Concierges', href: '/private-concierge' },
  { label: 'Partner Properties', href: '/journeys' },
  { label: 'Press', href: '/our-story' },
  { label: 'Contact', href: '/begin-your-journey' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/our-story' },
  { label: 'Terms of Use', href: '/our-story' },
  { label: 'Cookie Preferences', href: '/our-story' },
  { label: 'Responsible Travel', href: '/our-story' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterState('error');
      return;
    }
    // TODO: connect newsletter provider
    setNewsletterState('success');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <Link href="/" className={styles.wordmark}>Meridian</Link>
          <p className={styles.tagline}>Private journeys for those who travel with intention. Designed by concierges. Remembered for a lifetime.</p>
          <div className={styles.social}>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <div className={styles.dot}/>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <div className={styles.dot}/>
            <Link href="/journal">The Journal</Link>
          </div>
        </div>

        <div>
          <div className={styles.colHead}>Journeys</div>
          <div className={styles.colLinks}>
            {JOURNEY_LINKS.map(l => (
              <Link key={l.href + l.label} href={l.href}>{l.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.colHead}>Company</div>
          <div className={styles.colLinks}>
            {COMPANY_LINKS.map(l => (
              <Link key={l.href + l.label} href={l.href}>{l.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.colHead}>Seasonal Letters</div>
          <p className={styles.newsletterDesc}>Four times a year. A considered note on what the season holds.</p>
          <form className={styles.newsletterForm} onSubmit={handleSubscribe} noValidate>
            {newsletterState === 'success' ? (
              <p style={{ fontSize: '13px', color: 'var(--m-gold)', letterSpacing: '0.03em' }}>Thank you — we will be in touch.</p>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Your address"
                  className={`${styles.emailInput} ${newsletterState === 'error' ? styles.emailInputError : ''}`}
                  value={email}
                  onChange={e => { setEmail(e.target.value); setNewsletterState('idle'); }}
                  aria-label="Email address for seasonal letters"
                  aria-invalid={newsletterState === 'error'}
                />
                <button type="submit" className={styles.subscribeBtn}>Subscribe</button>
              </>
            )}
            {newsletterState === 'error' && (
              <p role="alert" style={{ fontSize: '12px', color: 'oklch(55% 0.1 27)', marginTop: '6px' }}>Please enter a valid email address.</p>
            )}
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copyright}>© 2026 Meridian Private Journeys. All rights reserved.</div>
        <div className={styles.legal}>
          {LEGAL_LINKS.map(l => (
            <Link key={l.label} href={l.href}>{l.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
