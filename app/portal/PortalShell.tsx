'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { JourneyProvider } from '@/context/JourneyContext';
import { NotificationProvider } from '@/context/NotificationContext';
import NotificationBell from '@/components/portal/NotificationBell';

const NAV = [
  { href: '/portal',            label: 'Dashboard',   icon: DashIcon,   exact: true },
  { href: '/portal/journeys',   label: 'My Journeys', icon: GlobeIcon },
  { href: '/portal/messages',   label: 'Messages',    icon: ChatIcon,   badge: 1 },
  { href: '/portal/documents',  label: 'Documents',   icon: DocIcon },
  { href: '/portal/payments',   label: 'Payments',    icon: CardIcon },
  { href: '/portal/travellers', label: 'Travellers',  icon: PersonIcon },
  { href: '/portal/settings',   label: 'Settings',    icon: CogIcon },
];

const MOBILE_NAV = NAV.slice(0, 5);

export default function PortalShell({ children }: { children: ReactNode }) {
  const path = usePathname();

  if (path === '/portal/login') return <>{children}</>;

  const isWorkspace = path.includes('/workspace');
  const isFullPage  = isWorkspace || path === '/portal/messages';

  function active(href: string, exact?: boolean) {
    if (exact) return path === href;
    return path === href || path.startsWith(href + '/');
  }

  return (
    <NotificationProvider>
    <JourneyProvider>
    <div className="portalRoot">
      {/* Desktop sidebar */}
      <aside className="sidebar" aria-label="Portal navigation">
        <Link href="/portal" className="sidebarWordmark">
          <span className="sidebarName">Meridian</span>
          <span className="sidebarPortal">Client Portal</span>
        </Link>

        <nav className="sidebarNav" aria-label="Main navigation">
          {NAV.map(({ href, label, icon: Icon, exact, badge }) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href, exact) ? 'page' : undefined}
              className={`navItem${active(href, exact) ? ' active' : ''}`}
            >
              <span className="navIcon" aria-hidden="true"><Icon /></span>
              {label}
              {badge ? (
                <span className="navBadge" aria-label={`${badge} unread`}>{badge}</span>
              ) : null}
            </Link>
          ))}
        </nav>

        {/* Notification bell — sits between nav and concierge card */}
        <NotificationBell variant="sidebar" />

        <div className="sidebarConcierge">
          <div className="conciergeLabel">Your Concierge</div>
          <div className="conciergeRow">
            <div className="conciergeAvatar" aria-hidden="true">SL</div>
            <div className="conciergeInfo">
              <div className="conciergeName">Sofia Laurent</div>
              <div className="conciergeStatus">Available</div>
            </div>
          </div>
          <Link href="/portal/messages" className="conciergeMsg">
            Send a message
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
            </svg>
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="mobileBar" role="banner">
        <span className="mobileBarName">Meridian</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <NotificationBell variant="mobile" />
          <div className="topAvatar" aria-hidden="true">EW</div>
        </div>
      </div>

      {/* Main */}
      <main className={`main${isFullPage ? ' mainFull' : ''}`} id="main-content">
        {isFullPage ? children : <div className="mainInner">{children}</div>}
      </main>

      {/* Mobile bottom nav */}
      <nav className="mobileNav" aria-label="Main navigation">
        {MOBILE_NAV.map(({ href, label, icon: Icon, exact, badge }) => (
          <Link
            key={href}
            href={href}
            aria-current={active(href, exact) ? 'page' : undefined}
            className={`mobileNavItem${active(href, exact) ? ' active' : ''}`}
          >
            {badge ? (
              <span className="mobileNavBadge" aria-label={`${badge} unread`}>{badge}</span>
            ) : null}
            <span className="mobileNavIcon" aria-hidden="true"><Icon /></span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
    </JourneyProvider>
    </NotificationProvider>
  );
}

// ─── Exact icon SVGs from approved design ────────────────────────────────────

function DashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="1" width="5" height="5" rx="0.5"/>
      <rect x="8" y="1" width="5" height="5" rx="0.5"/>
      <rect x="1" y="8" width="5" height="5" rx="0.5"/>
      <rect x="8" y="8" width="5" height="5" rx="0.5"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5"/>
      <path d="M7 1.5v11M1.5 7h11"/>
      <path d="M3 3.5C4.5 5 9.5 5 11 3.5M3 10.5C4.5 9 9.5 9 11 10.5"/>
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.5 9A1.5 1.5 0 0 1 11 10.5H4L1.5 12.5V3A1.5 1.5 0 0 1 3 1.5h8A1.5 1.5 0 0 1 12.5 3z"/>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 1.5H3A1 1 0 0 0 2 2.5v9A1 1 0 0 0 3 12.5h8a1 1 0 0 0 1-1v-7z"/>
      <path d="M8 1.5v4h4"/>
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1.5" y="3.5" width="11" height="7" rx="0.5"/>
      <path d="M1.5 6.5h11"/>
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="4.5" r="2.5"/>
      <path d="M1.5 12.5c0-2.761 2.462-5 5.5-5s5.5 2.239 5.5 5"/>
    </svg>
  );
}

function CogIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="7" r="2"/>
      <path d="M7 1.5v1M7 11.5v1M1.5 7h1M11.5 7h1M3.4 3.4l.7.7M9.9 9.9l.7.7M10.6 3.4l-.7.7M4.1 9.9l-.7.7"/>
    </svg>
  );
}
