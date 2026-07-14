'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Nav.module.css';

const NAV_ROUTES: Record<string, string> = {
  'Destinations': '/journeys',
  'Experiences': '/collections',
  'Collections': '/collections',
  'Journeys': '/journeys',
  'Wellness': '/collections/wellness',
  'Cultural Immersion': '/collections/cultural-immersion',
  'Adventure & Landscape': '/collections/adventure-landscape',
  'Honeymoon': '/collections/honeymoon',
  'Concierge': '/private-concierge',
  'The Journal': '/journal',
  'Our Story': '/our-story',
};

export default function Nav({
  activePage = 'Destinations',
  lightMode = false,
  goldCta = false,
}: {
  activePage?: string;
  lightMode?: boolean;
  goldCta?: boolean;
}) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(lightMode);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lightMode) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lightMode]);

  // Mobile menu Escape / body scroll lock
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); menuBtnRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Profile menu Escape + outside click
  useEffect(() => {
    if (!profileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setProfileOpen(false); profileBtnRef.current?.focus(); }
    };
    const onOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node) &&
          profileBtnRef.current && !profileBtnRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onOutside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onOutside); };
  }, [profileOpen]);

  const closeMenu = useCallback(() => { setMenuOpen(false); menuBtnRef.current?.focus(); }, []);

  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

  const navItems = activePage === 'Collections'
    ? ['Collections', 'Destinations', 'Concierge', 'The Journal']
    : activePage === 'Wellness'
    ? ['Destinations', 'Wellness', 'Concierge', 'The Journal']
    : activePage === 'Cultural Immersion'
    ? ['Destinations', 'Cultural Immersion', 'Concierge', 'The Journal']
    : activePage === 'Adventure & Landscape'
    ? ['Destinations', 'Adventure & Landscape', 'Concierge', 'The Journal']
    : activePage === 'Honeymoon'
    ? ['Destinations', 'Honeymoon', 'Concierge', 'The Journal']
    : activePage === 'Journeys'
    ? ['Journeys', 'Collections', 'Concierge', 'The Journal']
    : activePage === 'The Journal'
    ? ['Destinations', 'Collections', 'Concierge', 'The Journal']
    : activePage === 'Concierge'
    ? ['Destinations', 'Collections', 'Concierge', 'The Journal']
    : activePage === 'Begin'
    ? ['Destinations', 'Collections', 'Concierge', 'The Journal']
    : activePage === 'Our Story'
    ? ['Destinations', 'Collections', 'Concierge', 'The Journal']
    : ['Destinations', 'Experiences', 'Concierge', 'The Journal', 'Our Story'];

  return (
    <>
      <nav
        className={styles.navBar}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: scrolled ? '60px' : '72px',
          background: scrolled ? 'oklch(100% 0 0 / 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.4)' : 'none',
          borderBottom: scrolled ? '1px solid var(--m-border-s)' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 20px oklch(13% 0.012 55 / 0.06)' : 'none',
          transition: `all 300ms ${ease}`,
          zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link href="/" aria-label="Meridian — return to homepage" style={{
          fontFamily: 'var(--font-d)', fontSize: '23px', fontWeight: 500,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: scrolled ? 'var(--m-ink)' : 'white',
          flexShrink: 0, transition: `color 300ms ${ease}`, textDecoration: 'none',
        }}>Meridian</Link>

        <div className={styles.desktopLinks}>
          {navItems.map((item) => {
            const isActive = item === activePage;
            const href = NAV_ROUTES[item] ?? '/';
            return (
              <Link key={item} href={href} style={{
                fontSize: '13px',
                color: scrolled ? 'var(--m-charcoal)' : 'oklch(82% 0.012 70)',
                letterSpacing: '0.04em',
                paddingBottom: isActive ? '3px' : undefined,
                borderBottom: isActive ? '1.5px solid var(--m-gold)' : undefined,
                transition: `color 300ms ${ease}`, textDecoration: 'none',
              }} aria-current={isActive ? 'page' : undefined}>{item}</Link>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div className={styles.desktopOnly}>
            <Link href="/journal" aria-label="Browse the journal" style={{
              background: 'transparent', border: 'none', padding: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={scrolled ? 'var(--m-charcoal)' : 'oklch(78% 0.012 70)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </Link>

            <div style={{ width: '1px', height: '18px', background: scrolled ? 'var(--m-border-s)' : 'oklch(100% 0 0 / 0.18)' }}/>

            {/* Profile button with dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                ref={profileBtnRef}
                onClick={() => setProfileOpen(o => !o)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                aria-label="Account menu"
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: scrolled ? 'transparent' : 'oklch(100% 0 0 / 0.08)',
                  border: scrolled ? '1.5px solid var(--m-border)' : '1.5px solid oklch(100% 0 0 / 0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', outline: 'none',
                  transition: `border-color 200ms, background 200ms`,
                }}
                onFocus={e => (e.currentTarget.style.outline = '2px solid var(--m-gold)')}
                onBlur={e => (e.currentTarget.style.outline = 'none')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={scrolled ? 'var(--m-charcoal)' : 'oklch(78% 0.012 70)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>

              {profileOpen && (
                <div
                  ref={profileMenuRef}
                  role="menu"
                  aria-label="Account menu"
                  className={styles.profileMenu}
                >
                  <button
                    role="menuitem"
                    className={styles.profileMenuItem}
                    onClick={() => { setProfileOpen(false); router.push('/journey-workspace'); }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    Open Journey Workspace
                  </button>
                  <div className={styles.profileMenuDivider} />
                  <button
                    role="menuitem"
                    className={styles.profileMenuItem}
                    onClick={() => { setProfileOpen(false); setSignInOpen(true); }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                    Sign in
                    <span className={styles.prototypeBadge}>prototype</span>
                  </button>
                </div>
              )}
            </div>

            <Link href="/begin-your-journey" style={{
              background: goldCta ? 'var(--m-gold)' : scrolled ? 'var(--m-ink)' : 'transparent',
              color: 'white',
              border: goldCta ? 'none' : scrolled ? 'none' : '1px solid oklch(100% 0 0 / 0.35)',
              padding: '10px 22px', borderRadius: '4px',
              fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em',
              textTransform: 'uppercase', transition: `all 300ms ${ease}`,
              textDecoration: 'none', display: 'inline-block',
            }}>Begin a Journey</Link>
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuBtnRef}
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={styles.menuBtn}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={scrolled ? 'var(--m-charcoal)' : 'white'} strokeWidth="1.5" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></>}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: 'fixed', inset: 0, zIndex: 99,
            background: 'oklch(98% 0.006 72)',
            display: 'flex', flexDirection: 'column',
            padding: '96px 40px 48px', overflowY: 'auto',
          }}
        >
          <nav aria-label="Mobile navigation">
            {[
              { label: 'Home', href: '/' },
              { label: 'Journeys', href: '/journeys' },
              { label: 'Collections', href: '/collections' },
              { label: 'Wellness & Restoration', href: '/collections/wellness' },
              { label: 'Cultural Immersion', href: '/collections/cultural-immersion' },
              { label: 'Adventure & Landscape', href: '/collections/adventure-landscape' },
              { label: 'Honeymoon', href: '/collections/honeymoon' },
              { label: 'The Journal', href: '/journal' },
              { label: 'Private Concierge', href: '/private-concierge' },
              { label: 'Our Story', href: '/our-story' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} onClick={closeMenu} style={{
                display: 'block', fontFamily: 'var(--font-d)', fontSize: '28px',
                fontWeight: 400, color: 'var(--m-ink)', letterSpacing: '0.02em',
                padding: '14px 0', borderBottom: '1px solid var(--m-border-s)',
                textDecoration: 'none',
              }}>{label}</Link>
            ))}
          </nav>
          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/begin-your-journey" onClick={closeMenu} style={{
              display: 'inline-block', background: 'var(--m-ink)', color: 'white',
              padding: '14px 32px', borderRadius: '4px', fontSize: '13px',
              letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
            }}>Begin a Journey</Link>
            <Link href="/journey-workspace" onClick={closeMenu} style={{
              display: 'inline-block', color: 'var(--m-charcoal)',
              padding: '14px 0', fontSize: '13px',
              letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
            }}>Journey Workspace</Link>
          </div>
        </div>
      )}

      {/* Sign in prototype modal */}
      {signInOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'oklch(8% 0.008 55 / 0.72)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSignInOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'oklch(17% 0.012 55)',
              border: '1px solid oklch(26% 0.014 55)',
              borderRadius: '6px', padding: '40px 36px',
              maxWidth: '400px', width: '100%',
              textAlign: 'center',
            }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'oklch(22% 0.014 58)',
              border: '1px solid oklch(30% 0.018 60)',
              marginBottom: '24px',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="oklch(62% 0.018 64)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div style={{
              fontFamily: 'var(--font-d)', fontSize: '22px', fontWeight: 300,
              color: 'oklch(88% 0.012 68)', marginBottom: '10px',
            }}>Sign in</div>
            <p style={{
              fontSize: '13px', fontWeight: 300, color: 'oklch(46% 0.012 60)',
              lineHeight: 1.7, marginBottom: '28px',
            }}>
              Authentication is not yet live in this prototype.
              Journey workspaces are accessible directly from the account menu.
            </p>
            <button
              onClick={() => setSignInOpen(false)}
              style={{
                width: '100%', padding: '12px',
                background: 'oklch(22% 0.014 58)',
                border: '1px solid oklch(32% 0.018 60)',
                borderRadius: '2px',
                color: 'oklch(68% 0.014 65)',
                fontSize: '11.5px', letterSpacing: '0.07em',
                textTransform: 'uppercase', cursor: 'pointer',
              }}
            >Close</button>
          </div>
        </div>
      )}
    </>
  );
}
