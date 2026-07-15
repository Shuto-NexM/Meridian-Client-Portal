import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Dashboard' };
import s from './dashboard.module.css';
import {
  PORTAL_USER, ACTIVE_JOURNEY, TODAY_ITINERARY,
  SOFIA_TASKS, PAYMENTS, STAGE_ORDER, STAGE_LABELS,
} from '@/data/portal';

// ── Coloured document-page icon (matches design exactly) ──────────────────────
function DocFileIcon({ color, lines = 2 }: { color: string; lines?: number }) {
  return (
    <svg width="20" height="26" viewBox="0 0 20 26" fill="none" stroke={color} strokeWidth="1.1">
      <path d="M3 1h10l5 5v18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
      <path d="M13 1v5h5" />
      <rect x="4" y="12" width="12" height="1" fill={color} stroke="none" />
      <rect x="4" y="15.5" width={lines === 3 ? 10 : 8} height="1" fill={color} stroke="none" />
      {lines === 3 && <rect x="4" y="19" width="7" height="1" fill={color} stroke="none" />}
    </svg>
  );
}

// ── WiFi-off icon for offline bar ─────────────────────────────────────────────
function WifiOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="#9A9080" strokeWidth="1.2" style={{ flexShrink: 0 }}>
      <path d="M9 13.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z" fill="#9A9080" />
      <path d="M1.5 6A10.5 10.5 0 0 1 16.5 6" />
      <path d="M4 9A7 7 0 0 1 14 9" />
      <path d="M6.5 11.5A3.5 3.5 0 0 1 11.5 11.5" />
      <line x1="2" y1="2" x2="16" y2="16" />
    </svg>
  );
}

// ── Arrow SVG shared ──────────────────────────────────────────────────────────
function ArrowSm({ stroke = '#1A1510' }: { stroke?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={stroke} strokeWidth="1.2">
      <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" />
    </svg>
  );
}

export default function DashboardPage() {
  const pct = Math.round((PAYMENTS.deposit.amount / PAYMENTS.total) * 100);
  const stageIdx = STAGE_ORDER.indexOf(ACTIVE_JOURNEY.stage);
  const fillPct = (stageIdx / (STAGE_ORDER.length - 1)) * 100;

  const DOCS = [
    { title: 'Passport',           meta: '3 Jul · Identity',      color: '#C8A96A', lines: 2 },
    { title: 'Final Itinerary',    meta: '10 Jul · Itinerary',    color: '#7A9A8A', lines: 3 },
    { title: 'Hotel Confirmation', meta: '12 Jul · Accommodation', color: '#8A8AB0', lines: 2 },
  ] as const;

  const EMERGENCY_LINKS = [
    { label: 'Emergency Concierge',    href: '/portal/messages' },
    { label: 'Local Emergency Numbers', href: '/portal/messages' },
    { label: 'Embassy Information',    href: '/portal/messages' },
    { label: 'Medical Assistance',     href: '/portal/messages' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className={`topBar ${s.topBarDash}`}>
        <span className="topDate">Monday, 14 July 2026</span>
        <div className="topUser">
          <div className="topAvatar">{PORTAL_USER.initials}</div>
          <span className="topUsername">{PORTAL_USER.name}</span>
        </div>
      </div>

      {/* Greeting */}
      <div className={s.greeting}>
        <h1 className={s.greetingHeading}>Good afternoon,<br />Emily.</h1>
        <p className={s.greetingSub}>Your Japan journey is ready for review. Sofia has updated the itinerary.</p>
      </div>

      {/* ── Two-column grid ── */}
      <div className={s.grid}>

        {/* ── LEFT COLUMN ── */}
        <div className={s.left}>

          {/* Journey hero (dark card) */}
          <div className={`${s.journeyCard} darkCard`}>
            {/* Status row */}
            <div className={s.journeyStatusRow}>
              <span className={s.journeyActiveLabel}>Active Journey</span>
              <span className="badge badgeGold">In Review</span>
            </div>

            {/* Destination */}
            <div className={s.journeyDest}>Japan</div>

            {/* Meta row — below title */}
            <div className={s.journeyMeta}>
              <span className={s.metaItem}>12 Nights</span>
              <span className={s.metaSep} />
              <span className={s.metaItem}>3 Destinations</span>
              <span className={s.metaSep} />
              <span className={s.metaItem}>Sep 2026</span>
            </div>

            {/* Progress tracker */}
            <div className={s.stageWrapper}>
              <div className={s.stageTrack}>
                {/* Background line */}
                <div className={s.stageLineBg} />
                {/* Gold fill line */}
                <div className={s.stageLineFill} style={{ width: `${fillPct}%` }} />
                {/* Dots */}
                <div className={s.stageDots}>
                  {STAGE_ORDER.map((stage, i) => (
                    <div
                      key={stage}
                      className={`${s.stageDot} ${
                        i < stageIdx ? s.stageDotDone
                        : i === stageIdx ? s.stageDotActive
                        : s.stageDotFuture
                      }`}
                    >
                      {i === stageIdx && <span className={s.stageDotInner} />}
                    </div>
                  ))}
                </div>
              </div>
              <div className={s.stageLabelsRow}>
                {STAGE_ORDER.map((stage, i) => (
                  <span
                    key={stage}
                    className={`${s.stageLabel} ${i <= stageIdx ? s.stageLabelActive : ''}`}
                  >
                    {STAGE_LABELS[stage]}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className={s.journeyCtas}>
              <Link href="/portal/journeys/japan/workspace" className={`btnGold ${s.ctaBtn}`}>
                Continue in Workspace
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#16120E" strokeWidth="1.5">
                  <path d="M2 6h8M6.5 3.5L9 6l-2.5 2.5" />
                </svg>
              </Link>
              <Link href="/portal/journeys/japan" className={s.viewSummary}>View Summary</Link>
            </div>
          </div>

          {/* Today card */}
          <div className={`${s.todayCard} card`}>
            <div className={s.todayHeader}>
              <h2 className={s.cardHeading}>Today</h2>
              <span className={s.todayMeta}>Day 4 · Kyoto</span>
            </div>
            <div className={s.timeline}>
              <div className={s.timelineRule} />
              {TODAY_ITINERARY.map((item, i) => (
                <div key={i} className={s.tlRow}>
                  <div className={s.tlTime}>{item.time}</div>
                  <div className={`${s.tlDot} ${i === 0 ? s.tlDotActive : s.tlDotPlain}`} />
                  <div className={s.tlContent}>
                    <div className={s.tlTitle}>{item.title}</div>
                    <div className={s.tlPlace}>{item.place}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sofia is preparing */}
          <div className={`${s.sofiaCard} card`}>
            <div className={s.sofiaHeader}>
              <h2 className={s.cardHeading}>Sofia is preparing</h2>
              <span className={s.sofiaUpdated}>Updated 2h ago</span>
            </div>
            <div className={s.sofiaTasks}>
              {SOFIA_TASKS.map((task, i) => (
                <div key={i} className={`${s.sofiaTask} ${i < SOFIA_TASKS.length - 1 ? s.sofiaTaskBorder : ''}`}>
                  <span className={`${s.sofiaTaskDot} ${task.status === 'in-progress' ? s.dotGold : s.dotGray}`} />
                  <div className={s.sofiaTaskBody}>
                    <div className={s.sofiaTaskText}>{task.text}</div>
                    <div className={s.sofiaTaskDetail}>{task.detail}</div>
                  </div>
                  <span className={`badge ${task.status === 'in-progress' ? 'badgeGold' : 'badgeMuted'}`}>
                    {task.status === 'in-progress' ? 'In progress' : 'Reviewing'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className={s.right}>

          {/* Messages */}
          <div className={`${s.rCard} card`}>
            <div className={s.msgHeader}>
              <span className={s.rCardLabel}>Messages</span>
              <span className={s.msgUnreadBadge}>1 unread</span>
            </div>
            <div className={s.msgBody}>
              <div className={s.msgAvatar}>SL</div>
              <div className={s.msgContent}>
                <div className={s.msgNameRow}>
                  <span className={s.msgName}>Sofia Laurent</span>
                  <span className={s.msgTime}>2h ago</span>
                </div>
                <p className={s.msgPreview}>
                  Your revised Travel Book is ready — the Kyoto days now begin with Nanzen-ji.
                </p>
              </div>
            </div>
            <div className={s.msgFooter}>
              <Link href="/portal/messages" className={s.msgCta}>
                Open Conversation
                <ArrowSm />
              </Link>
            </div>
          </div>

          {/* Documents */}
          <div className={`${s.rCard} card`}>
            <div className={s.docsHeader}>
              <span className={s.rCardLabel}>Documents</span>
              <Link href="/portal/documents" className={s.docsViewAll}>
                View all
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#9A9080" strokeWidth="1.2">
                  <path d="M1.5 4.5h6M4.5 2L7 4.5 4.5 7" />
                </svg>
              </Link>
            </div>
            <div className={s.docsList}>
              {DOCS.map((doc, i) => (
                <Link
                  key={doc.title}
                  href="/portal/documents"
                  className={`${s.docRow} ${i === DOCS.length - 1 ? s.docRowLast : ''}`}
                >
                  <div className={s.docIconWrap}>
                    <DocFileIcon color={doc.color} lines={doc.lines} />
                  </div>
                  <div className={s.docBody}>
                    <div className={s.docName}>{doc.title}</div>
                    <div className={s.docMeta}>{doc.meta}</div>
                  </div>
                  <svg className={s.docArrow} width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9A9080" strokeWidth="1.1">
                    <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Emergency */}
          <div className={`${s.rCard} card`}>
            <div className={s.emergencyHeader}>
              <span className={s.rCardLabel}>Emergency</span>
            </div>
            <div className={s.emergencyList}>
              {EMERGENCY_LINKS.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${s.emergencyRow} ${i === EMERGENCY_LINKS.length - 1 ? s.emergencyRowLast : ''}`}
                >
                  <span className={s.emergencyLabel}>{item.label}</span>
                  <ArrowSm stroke="#9A9080" />
                </Link>
              ))}
            </div>
          </div>

          {/* Payments */}
          <div className={`${s.rCard} card`}>
            <div className={s.payHeader}>
              <span className={s.rCardLabel}>Payments</span>
              <div className={s.payStatus}>
                <span className={s.payGreenDot} />
                <span className={s.payStatusText}>Deposit confirmed</span>
              </div>
            </div>
            <div className={s.payBody}>
              <div className={s.payProgressRow}>
                <span className={s.payProgressLabel}>Journey funded</span>
                <span className={s.payProgressPct}>{pct}%</span>
              </div>
              <div className={s.payProgressTrack}>
                <div className={s.payProgressFill} style={{ width: `${pct}%` }} />
              </div>
              <div className={s.payAmounts}>
                <div className={s.payAmountLeft}>
                  <div className={s.payAmountLabel}>Deposit Paid</div>
                  <div className={s.payAmountNum}>£{PAYMENTS.deposit.amount.toLocaleString()}</div>
                  <div className={`${s.payAmountSub} ${s.paySubGreen}`}>Received 28 Jun</div>
                </div>
                <div className={s.payAmountRight}>
                  <div className={s.payAmountLabel}>Remaining</div>
                  <div className={s.payAmountNum}>£{(PAYMENTS.total - PAYMENTS.deposit.amount).toLocaleString()}</div>
                  <div className={`${s.payAmountSub} ${s.paySubGray}`}>Due 18 Aug 2026</div>
                </div>
              </div>
              <div className={s.payFooter}>
                <Link href="/portal/payments" className={s.payCta}>
                  View Invoice
                  <ArrowSm />
                </Link>
              </div>
            </div>
          </div>

          {/* Offline */}
          <div className={s.offlineBar}>
            <WifiOffIcon />
            <div>
              <div className={s.offlineTitle}>Available Offline</div>
              <div className={s.offlineSub}>
                <span>Itinerary</span>
                <span className={s.offlineSep}>·</span>
                <span>Documents</span>
                <span className={s.offlineSep}>·</span>
                <span>Hotel Confirmations</span>
                <span className={s.offlineSep}>·</span>
                <span>Boarding Passes</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
